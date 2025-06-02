from django.urls import path
from .import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.homepage, name="index"),
    path('readval/', views.readval, name="readval")
    # path('pdf/',views.get_data, name='pdf'),       
]