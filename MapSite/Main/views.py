import requests
from rest_framework import permissions, serializers
from rest_framework import response
from rest_framework.utils import serializer_helpers
from .models import Markers, User, Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import CreateMarker, DetailMarkerInfoSerializer, ProfileDataSerializer, GetProfileDataSerializer

# class MainWindow(TemplateView):
#     template_name = 'main.html'


# class CreateMarkerView(APIView):
#     def post(self, request):
#         marker = CreateMarker().create(request.data)
#         if marker.is_valid():
#             marker.save()
#         return Response(status=201)
        
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
        
        # try:
        new_marker = Markers.objects.create(lng=marker_data['lng'],
                                            lat=marker_data['lat'],
                                            address = new_address,
                                            owner=User.objects.get(id = request.user.id),
                                            price=marker_data['price'],
                                            type=marker_data['type']
        )
        new_marker.save()
        # except IntegrityError:
        #     return Response(status = 418, data={"Error": "Dublicate"})

        serializers = CreateMarker(new_marker)

        return Response(status = 201, data = serializers.data)

    def get(self, request, *args, **kwargs):
        markers = self.get_queryset()
        serializers = CreateMarker(markers, many=True)
        return Response(serializers.data)


class DetailMarkerInfoView(APIView):

    def get(self, request, pk):
        marker = Markers.objects.get(id=pk)
        serializer = DetailMarkerInfoSerializer(marker)
        return Response(serializer.data)


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
        if Profile.objects.get(user = User.objects.get(id = request.user.id)):
            new_profile = Profile.objects.get(user = User.objects.get(id = request.user.id))
            new_profile.fio = profile_data['fio']
            new_profile.phone_number = profile_data['phone_number']
            new_profile.save(update_fields=['fio','phone_number'])
        else:
            new_profile = Profile.objects.create(fio=profile_data['fio'], 
                                            phone_number=profile_data['phone_number'], 
                                            user=User.objects.get(id = request.user.id))
            new_profile.save()

        serializers = ProfileDataSerializer(Profile.objects.get(user = User.objects.get(id = request.user.id)))
        return Response(status=201, data=serializers.data)

    def get(self, request):
        serializer = ProfileDataSerializer(Profile.objects.get(user = User.objects.get(id = request.user.id)))
        return Response(serializer.data)