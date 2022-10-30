import requests
from django.shortcuts import render
from rest_framework import permissions
from .models import Active_rent, Markers, User, Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import CreateMarker, DetailMarkerInfoSerializer, ProfileDataSerializer, GetProfileDataSerializer
from django.shortcuts import get_object_or_404


def auth_view(request):
    return render(request, 'auth.html')

def main_view(request):
    return render(request, 'main.html')

class CreateGetMarkerView(APIView):
    serializer_class = CreateMarker
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        marker = Markers.objects.all()
        return marker
        
    def post(self, request, *args, **kwargs):
        marker_data = request.data
        url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={marker_data['lat']}, {marker_data['lng']}&key=AIzaSyAmIBHpjazvTWnEfyZ7NHcB1TC92eBBMnU&language=ru"
        response = requests.get(url).json()
        new_address = response['results'][0]['formatted_address']
        new_marker = Markers.objects.create(lng=marker_data['lng'],
                                            lat=marker_data['lat'],
                                            address = new_address,
                                            owner=User.objects.get(id = request.user.id),
                                            price=marker_data['price'],
                                            type=marker_data['type']
        )
        new_marker.save()
        serializers = CreateMarker(new_marker)

        return Response(status = 201, data = serializers.data)

    def get(self, request, *args, **kwargs):
        markers = self.get_queryset()
        serializers = CreateMarker(markers, many=True)
        return Response(serializers.data)


class DetailMarkerInfoView(APIView):

    # permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        marker = Markers.objects.get(id=pk)
        serializer = DetailMarkerInfoSerializer(marker)
        return Response(serializer.data)
        

class PostNewRentView(APIView):

    def post(self, request):
        rent_data = request.data

        new_rent = Active_rent.objects.create(
            marker_id=Markers.objects.get(id=rent_data['marker_id']),
            rent_date=rent_data['rent_date'],
            buyer_id=User.objects.get(id=request.user.id)
        )
        new_rent.save()

        return Response(status=201)



class GetProfileInfoView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        profile_data = Profile.objects.get(user=pk)
        serializer = GetProfileDataSerializer(profile_data)
        return Response(serializer.data)


class PostProfileInfoView(APIView):

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        profile_data = request.data
        
        new_data, _ = Profile.objects.update_or_create(
            user = User.objects.get(id = request.user.id),
            defaults={'fio': profile_data['fio'], 'phone_number':profile_data['phone_number']}
        )
        new_data.save()

        serializers = ProfileDataSerializer(Profile.objects.get(user = User.objects.get(id = request.user.id)))
        return Response(status=201, data=serializers.data)

    def get(self, request):
        serializer = ProfileDataSerializer(Profile.objects.get(user = User.objects.get(id = request.user.id)))
        return Response(serializer.data)