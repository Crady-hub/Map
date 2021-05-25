import requests
from Main.models import Markers, User
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import CreateMarker


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

    def get_queryset(self):
        marker = Markers.objects.all()
        return marker
        
    def post(self, request, *args, **kwargs):
        marker_data = request.data
        print(marker_data)
        url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={marker_data['lat']}, {marker_data['lng']}&key=AIzaSyAmIBHpjazvTWnEfyZ7NHcB1TC92eBBMnU&language=ru"
        response = requests.get(url).json()
        new_address = response['results'][0]['formatted_address']

        new_marker = Markers.objects.create(lng=marker_data['lng'], lat=marker_data['lat'], address = new_address, owner=User.objects.get(id = marker_data['owner']))

        new_marker.save()

        serializers = CreateMarker(new_marker)

        return Response(status = 201, data = serializers.data)

    def get(self, request, *args, **kwargs):
        markers = self.get_queryset()
        serializers = CreateMarker(markers, many=True)

        return Response(serializers.data)