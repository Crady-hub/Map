from django.urls import path
from .views import  CreateGetMarkerView
from Main import views 

urlpatterns = [
    # path('', MainWindow.as_view(), name='main-page'),
    path('api/v1/marker/', CreateGetMarkerView.as_view())
]