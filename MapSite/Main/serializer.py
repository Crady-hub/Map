
from django.db.models import fields
from rest_framework import serializers
from .models import Markers, Profile, Active_rent

# class CreateMarker(serializers.ModelSerializer):
#     class Meta:
#         model = Markers
#         exclude = ('created_date',)

#     def create(self, validate_data):
#         def get_address(lng, lat):
#             url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={lat}, {lng}&key=AIzaSyAmIBHpjazvTWnEfyZ7NHcB1TC92eBBMnU&language=ru"
#             response = requests.get(url).json()
#             print(response['results'][0]['formatted_address'])
#             return response['results'][0]['formatted_address']
        
#         markers = Markers.objects.create(
#             lng = validate_data.get('lng', None),
#             lat = validate_data.get('lat', None),
#             address = get_address(validate_data.get('lng'), validate_data.get('lat')),
#         )

#         return markers

class CreateMarker(serializers.ModelSerializer):

    class Meta:
        model = Markers
        exclude = ('created_date',)


# class OwnerCreateSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = User
#         fields = ('username',)


class GetProfileDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields =('fio', 'phone_number',)

class DetailMarkerInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Markers
        exclude = ('created_date',)


class ProfileDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = ('id', 'user',)
    



    

        