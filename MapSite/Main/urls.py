from django.urls import path
from .views import  (CreateGetMarkerView, 
                    DetailMarkerInfoView, 
                    PostProfileInfoView, 
                    GetProfileInfoView,
                    PostNewRentView,
                    auth_view,
                    main_view)

urlpatterns = [
    path('', auth_view, name='main-page'),
    path('main/', main_view),
    path('api/v1/marker/', CreateGetMarkerView.as_view()),
    path('api/v1/marker/<int:pk>', DetailMarkerInfoView.as_view()),
    path('api/v1/profile', PostProfileInfoView.as_view()),
    path('api/v1/profile/<int:pk>', GetProfileInfoView.as_view()),
    path('api/v1/rent', PostNewRentView.as_view())
]