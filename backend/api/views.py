from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})

def homepage(request):
    return JsonResponse({'resp': 'user logged'})



