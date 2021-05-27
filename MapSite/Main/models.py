from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    seller_or_buyer = models.BooleanField()

    
class Markers(models.Model):
    created_date = models.DateTimeField(auto_now_add=True)
    lat = models.DecimalField(decimal_places=15, max_digits=18)
    lng = models.DecimalField(decimal_places=15, max_digits=18)
    address = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner", default=1) 
    
    def __str__(self):
        return f'Владелец: {self.user.username}. Адрес: {self.address}'

    class Meta:
        verbose_name = 'Marker'
        verbose_name_plural = 'Markers'
        unique_together = ('lat', 'lng')
    

class Active_rent(models.Model): 
    marker_id = models.ForeignKey(Markers, on_delete=models.CASCADE)
    dfrom = models.DateField()
    dto = models.DateField()
    buyer_id = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.markers.user.username} -> {self.user.username}'
    
    class Meta:
        verbose_name = 'Rent'
        verbose_name_plural = 'List of rent'