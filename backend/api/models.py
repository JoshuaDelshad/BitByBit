from django.db import models

class Users(models.Model):
    username = models.CharField(max_length=100)
    inventory = models.JSONField(default=dict) 

    def __str__(self):
        return self.username
    
    print(username, inventory)