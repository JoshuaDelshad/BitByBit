from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
def hello(request):
    return JsonResponse({"message": "Hello World"})

@csrf_exempt
def login(request, user_identifier):
    print(f"Logging in user: {user_identifier}")
    return JsonResponse({"status": "success"})



