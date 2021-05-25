from Main.models import Markers
from django.views import generic
from rest_framework import generics, permissions, serializers
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import CreateMarker


# class MainWindow(TemplateView):
#     template_name = 'main.html'


class CreateMarkerView(APIView):
    def post(self, request):
        marker = CreateMarker(data=request.data)
        if marker.is_valid():
            print(marker)
            marker.save()

        return Response(status=201)
    