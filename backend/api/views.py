from django.shortcuts import render
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})

def login(request, user_identifier):
    print('Message Is', request.body)
    return JsonResponse(request.body)
