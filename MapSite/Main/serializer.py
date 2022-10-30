
from django.db.models import fields
from rest_framework import serializers
from .models import Markers, Profile, Active_rent


class CreateMarker(serializers.ModelSerializer):

    class Meta:
        model = Markers
        exclude = ('created_date',)


class GetProfileDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('fio', 'phone_number',)

class DetailMarkerInfoSerializer(serializers.ModelSerializer):
    rent = serializers.SlugRelatedField(many=True, slug_field='rent_date', queryset=Active_rent.objects.values('rent_date'))

    class Meta:
        model = Markers
        exclude = ('created_date',)


class PostNewRentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Active_rent
        exclude = ('id', 'buyer_id',)


class ProfileDataSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        exclude = ('id', 'user',)
    



    

        