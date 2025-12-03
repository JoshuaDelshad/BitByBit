from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
def hello(request):
    return JsonResponse({"message": "Hello World"})

@csrf_exempt
def login(request, user_identifier):
    username = user_identifier.split("~")[1]
    password = user_identifier.split("~")[2]
    print(f"Username: {username}, Password: {password}")
    return JsonResponse({"status": "success"})