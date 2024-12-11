from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator



class MyUser(AbstractUser):
    ROLE_CHOICES = [
        ('NU', "Normal User"),
        ('WC', "Work Collector"),
    ]

    email = models.EmailField(unique=True)
    username=models.CharField(unique=True,primary_key=True,max_length=69)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    phone = models.CharField(
        max_length=10, 
        unique=True, 
        validators=[RegexValidator(r'^\d{10}$', 'Enter a valid phone number.')]
    )
    profile_image = models.ImageField(upload_to='profile_image/', blank=True, null=True)
    
    
    def __str__(self):
        return self.username
