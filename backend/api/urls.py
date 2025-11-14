from django.urls import path
from .views import hello, homepage

urlpatterns = [
    path('helper/', hello, ),
    path('gamestarthome/', homepage, ),
]
