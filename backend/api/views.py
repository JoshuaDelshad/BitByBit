from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})

def login(request, user_identifier):
    username = request.POST.get('email')
    password = request.POST.get('password')

    data = { 'message' : f'{username}, {password}, {user_identifier}' }
    
    return JsonResponse(data)



