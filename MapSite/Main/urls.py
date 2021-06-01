from django.urls import path
from .views import  CreateGetMarkerView, DetailMarkerInfoView, PostProfileInfoView, GetProfileInfoView

urlpatterns = [
    # path('', MainWindow.as_view(), name='main-page'),
    path('api/v1/marker/', CreateGetMarkerView.as_view()),
    path('api/v1/marker/<int:pk>', DetailMarkerInfoView.as_view()),
    path('api/v1/profile', PostProfileInfoView.as_view()),
    path('api/v1/profile/<int:pk>', GetProfileInfoView.as_view())
]