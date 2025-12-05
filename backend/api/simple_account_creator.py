# simple_account_creator.py
import os
# simple_account_creator.py
from pymongo import MongoClient
from typing import Optional

MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "admin"
USERS_COLL = "test"   # your collection

def get_db_client(uri: str = None) -> MongoClient:
    uri = uri or MONGO_URI
    return MongoClient(uri)

def create_account(first: str, last: str, email: str, password: str,
                   client: Optional[MongoClient] = None) -> dict:
    """
    Create a new user in MongoDB with FirstName, LastName, Email, Password fields.
    Returns {created: True} or {created: False, error: "..."}.
    """

    c = client or get_db_client()
    coll = c[DB_NAME][USERS_COLL]

    # Check if email already exists
    existing = coll.find_one({"Email": email.strip()})
    if existing:
        return {"created": False, "error": "Email already exists"}

    # Document structure EXACTLY how you want it
    doc = {
        "FirstName": first.strip(),
        "LastName": last.strip(),
        "Email": email.strip(),
        "Password": password   # plaintext for now to match your login system
    }

    try:
        coll.insert_one(doc)
        return {"created": True}
    except Exception as e:
        return {"created": False, "error": str(e)}

def _demo():
    print("Simple Account Creator (MongoDB write test)")

    first = input("First Name: ").strip()
    last = input("Last Name: ").strip()
    email = input("Email: ").strip()
    password = input("Password: ").strip()

    result = create_account(first, last, email, password)

    if result.get("created"):
        print(f"OK: account created for {email}")
    else:
        print(f"FAIL: {result.get('error')}")

    # loop like your login tester
    while True:
        again = input("Create another? (y/n): ").lower().strip()
        if again == "y":
            _demo()
        break


if __name__ == "__main__":
    _demo()