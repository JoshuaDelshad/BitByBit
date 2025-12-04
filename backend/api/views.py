from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .simple_account_creator import create_account

# import the checker from the same package
from .simple_account_checker import check_credentials

def hello(request):
    return JsonResponse({"message": "Hello World"})

@csrf_exempt
def login(request, user_identifier):
    # robust split: accept "~email~password" or "email~password"
    parts = [p for p in user_identifier.split("~") if p]
    if len(parts) != 2:
        return JsonResponse({"error": "bad format, expected '~email~password' or 'email~password'"}, status=400)

    email, password = parts
    print(f"Username: {email}, Password: {password}")

    try:
        authenticated = check_credentials(email, password)
        if authenticated:
            print(f"User {email} authenticated successfully.")
        else:
            print(f"Authentication failed for user {email}.")
    except Exception as e:
        return JsonResponse({"error": "checker error", "details": str(e)}, status=500)

    return JsonResponse({"email": email, "authenticated": bool(authenticated)})



@csrf_exempt
def create(request, user_info):
    # Expected: "~first~last~email~password" or "first~last~email~password"
    parts = [p for p in user_info.split("~") if p]

    if len(parts) != 4:
        return JsonResponse(
            {"error": "bad format, expected '~first~last~email~password' or 'first~last~email~password'"},
            status=400
        )

    first, last, email, password = parts

    print(f"Creating account: {first} {last}, email={email}")

    result = create_account(first, last, email, password)

    if not result.get("created"):
        return JsonResponse({"created": False, "error": result.get("error")}, status=400)

    return JsonResponse({
        "created": True,
        "email": email,
        "first": first,
        "last": last
    })