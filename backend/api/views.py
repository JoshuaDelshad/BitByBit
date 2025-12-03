# ...existing code...
from django.shortcuts import render
import json
from django.http import JsonResponse

def hello(request):
    return JsonResponse({"message": "Hello World"})

@csrf_exempt
def login(request, user_identifier):
    data = { 'message' : f'{user_identifier}' }
    print(data)
    return JsonResponse(data)



