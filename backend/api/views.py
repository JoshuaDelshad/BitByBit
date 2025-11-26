from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})

def login(request, user_identifier):
    data = { 'message' : f'{user_identifier}' }
    print(data)
    return JsonResponse(data)



