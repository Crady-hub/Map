from django.urls import path
from .views import  CreateMarkerView
from Main import views 

urlpatterns = [
    # path('', MainWindow.as_view(), name='main-page'),
    path('api/v1/marker/', CreateMarkerView.as_view())
]