from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .simple_account_checker import check_credentials, find_user_by_email
from .simple_account_creator import create_account


def hello(request):
    return JsonResponse({"message": "Hello World"})


@csrf_exempt
def login(request, user_identifier):
    """
    Handles:
      POST /com.gamestart/v1/home/userauthentication/login/~email~password
    """
    parts = [p for p in user_identifier.split("~") if p]

    if len(parts) != 2:
        return JsonResponse(
            {"error": "bad format, expected '~email~password' or 'email~password'"},
            status=400,
        )

    email, password = parts
    print(f"Login attempt -> email={email}, password={password}")

    try:
        authenticated = check_credentials(email, password)
        if authenticated:
            print(f"User {email} authenticated successfully.")
            # 🔹 get full user doc so we can return names
            doc = find_user_by_email(email)
            first = doc.get("FirstName") if doc else ""
            last = doc.get("LastName") if doc else ""
        else:
            print(f"Authentication failed for user {email}.")
            first = ""
            last = ""
    except Exception as e:
        return JsonResponse({"error": "checker error", "details": str(e)}, status=500)

    return JsonResponse(
        {
            "email": email,
            "authenticated": bool(authenticated),
            "first": first,
            "last": last,
        }
    )


@csrf_exempt
def register(request, user_info):
    """
    Handles:
      POST /com.gamestart/v1/home/userauthentication/register/~first~last~email~password
    """
    print(f"Raw user_info from URL: {user_info}")
    parts = [p for p in user_info.split("~") if p]

    if len(parts) != 4:
        return JsonResponse(
            {
                "error": (
                    "bad format, expected '~first~last~email~password' "
                    "or 'first~last~email~password'"
                )
            },
            status=400,
        )

    first, last, email, password = parts
    print(f"Register attempt -> {first} {last}, email={email}")

    try:
        result = create_account(first, last, email, password)
    except Exception as e:
        return JsonResponse(
            {"created": False, "error": f"creator error: {str(e)}"}, status=500
        )

    if not result.get("created"):
        # e.g. {"created": False, "error": "Email already exists"}
        return JsonResponse({"created": False, "error": result.get("error")}, status=400)

    return JsonResponse(
        {
            "created": True,
            "email": email,
            "first": first,
            "last": last,
        }
    )
