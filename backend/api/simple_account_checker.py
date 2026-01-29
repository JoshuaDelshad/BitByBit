import os
from pymongo import MongoClient
from typing import Optional

# Match what you actually have in Compass:
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "admin"        # you are using the admin database
USERS_COLL = "Test"      # your collection is called "test"

def get_db_client(uri: str = None) -> MongoClient:
    uri = uri or MONGO_URI
    return MongoClient(uri)

def find_user_by_email(email: str, client: Optional[MongoClient] = None) -> Optional[dict]:
    """Return the user document or None."""
    c = client or get_db_client()
    coll = c[DB_NAME][USERS_COLL]
    # your field in Mongo is "Email" (capital E)
    return coll.find_one({"Email": email.strip()})

def check_credentials(email: str, password: str, client: Optional[MongoClient] = None) -> bool:
    """Return True if email/password match (plaintext comparison)."""
    doc = find_user_by_email(email, client=client)
    if not doc:
        return False
    # your field in Mongo is "Password" (capital P)
    stored = doc.get("Password")
    if stored is None:
        return False
    return str(stored) == password

def _demo():
    print("Simple Account Checker (plaintext password compare)")
    email = input("Email: ").strip()
    password = input("Password: ")
    ok = check_credentials(email, password)
    if ok:
        print("OK: credentials match")
    else:
        print("FAIL: no match")
        while True:
            _demo()
            break

if __name__ == "__main__":
    _demo()
