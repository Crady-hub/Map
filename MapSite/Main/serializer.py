import requests
from django.contrib.auth import get_user
from rest_framework import serializers
from .models import Markers

class CreateMarker(serializers.ModelSerializer):

    class Meta:
        model = Markers
        exclude = ('created_date',)

    def create(self, validated_data):
        def get_address(lng, lat):
            url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat}, {lng}&key=AIzaSyAmIBHpjazvTWnEfyZ7NHcB1TC92eBBMnU&language=ru"
            response = requests.get(url).json()
            print(response['results'][0]['formatted_address'])
            return response['results'][0]['formatted_address']

        marker, _ = Markers.objects.create(
            lng = validated_data.get('lng', None),
            lat = validated_data.get('lat', None),
            address = get_address(validated_data.get('lng'), validated_data.get('lat')),
            owner = validated_data.get('owner', 1)
        )
        return marker

    



    

        