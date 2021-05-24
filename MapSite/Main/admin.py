from django.contrib import admin
from .models import Markers, Active_rent, Profile

class ProfileAdmin(admin.ModelAdmin):
    pass

class MarkersAdmin(admin.ModelAdmin):
    pass

class ActiveRentAdmin(admin.ModelAdmin):
    pass


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Markers, MarkersAdmin)
admin.site.register(Active_rent, ActiveRentAdmin)