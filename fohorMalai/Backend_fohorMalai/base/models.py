from datetime import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator,MinValueValidator




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


# class Waste(models.Model):
#     WASTE_TYPE = [
#         ('BIO', 'Biodegradable'),
#         ('NON', 'Non-Biodegradable')
#     ]
    
#     LOCATION = [
#         ('ITH', 'Itahari'),
#         ('KTM', 'Kathmandu'),
#         ('SAG', 'Sagarmatha')
#     ]
    
#     URGENCY = [
#         ('LOW', 'Low Priority'),
#         ('HIGH', 'High Priority')
#     ]
    
#     user = models.ForeignKey(
#         MyUser, 
#         on_delete=models.CASCADE, 
#         related_name='waste_records',
#     )

#     waste_type = models.CharField(
#         max_length=3, 
#         choices=WASTE_TYPE, 
#         help_text="Type of waste"
#     )
    
#     waste_weight = models.DecimalField(
#         max_digits=10, 
#         decimal_places=2, 
#         validators=[MinValueValidator(0)],
#         help_text="Weight of waste in kilograms"
#     )
    
#     location = models.CharField(
#         max_length=3, 
#         choices=LOCATION, 
#         help_text="Collection location"
#     )
    
#     urgency = models.CharField(
#         max_length=4, 
#         choices=URGENCY, 
#         default='LOW',
#         help_text="Urgency of waste management"
#     )
    
#     collection_date = models.DateTimeField(
#         auto_now_add=True, 
#         help_text="Date and time of waste collection"
#     )
    
#     description = models.TextField(
#         blank=True, 
#         null=True, 
#         help_text="Additional details about the waste"
#     )

#     def __str__(self):
#         return f"{self.get_waste_type_display()} Waste - {self.waste_weight} kg ({self.get_location_display()})"

#     class Meta:
#         verbose_name = "Waste Record"
#         verbose_name_plural = "Waste Records"
#         ordering = ['-collection_date']

# class Task(models.Model):
#     STATUS_CHOICES = [
#         ('PENDING', 'Pending'),
#         ('REJECTED', 'Rejected'),
#         ('COMPLETED', 'Completed'),
#     ]

#     waste_request = models.OneToOneField(
#         Waste, 
#         on_delete=models.CASCADE, 
#         related_name='task',
#         help_text="Associated waste request"
#     )
#     employee = models.ForeignKey(MyUser, related_name='tasks', on_delete=models.CASCADE)
#     status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
#     assigned_at = models.DateTimeField(auto_now_add=True)
#     completed_at = models.DateTimeField(null=True, blank=True)

#     def save(self, *args, **kwargs):
#         if self.status == 'COMPLETED' and not self.completed_at:
#             self.completed_at = timezone.now()
#         elif self.status != 'COMPLETED' and self.completed_at:
#             self.completed_at = None

#         super().save(*args, **kwargs)

#     def __str__(self):
#         return f"Task for {self.employee.username} - {self.waste_request.location}"

#     class Meta:
#         verbose_name = "Task"
#         verbose_name_plural = "Tasks"
#         ordering = ['-assigned_at']


class Waste(models.Model):
    WASTE_TYPE = [
        ('BIO', 'Biodegradable'),
        ('NON', 'Non-Biodegradable')
    ]
    
    LOCATION = [
        ('ITH', 'Itahari'),
        ('KTM', 'Kathmandu'),
        ('SAG', 'Sagarmatha')
    ]
    
    URGENCY = [
        ('LOW', 'Low Priority'),
        ('HIGH', 'High Priority')
    ]
    
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('REJECTED', 'Rejected'),
        ('ACCEPTED', 'Accepted'),
        ('COMPLETED', 'Completed'),
    ]
    
    user = models.ForeignKey(
        MyUser, 
        on_delete=models.CASCADE, 
        related_name='waste_records',
    )

    waste_type = models.CharField(
        max_length=3, 
        choices=WASTE_TYPE, 
        help_text="Type of waste"
    )
    
    waste_weight = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        validators=[MinValueValidator(0)],
        help_text="Weight of waste in kilograms"
    )
    
    location = models.CharField(
        max_length=3, 
        choices=LOCATION, 
        help_text="Collection location"
    )
    
    urgency = models.CharField(
        max_length=4, 
        choices=URGENCY, 
        default='LOW',
        help_text="Urgency of waste management"
    )
    
    collection_date = models.DateTimeField(
        auto_now_add=True, 
        help_text="Date and time of waste collection"
    )
    
    description = models.TextField(
        blank=True, 
        null=True, 
        help_text="Additional details about the waste"
    )
    
    status = models.CharField(
        max_length=10, 
        choices=STATUS_CHOICES, 
        default='PENDING',
        help_text="Status of the waste proposal (Pending, Accepted, Rejected)"
    )

    def __str__(self):
        return f"{self.get_waste_type_display()} Waste - {self.waste_weight} kg ({self.get_location_display()})"

    class Meta:
        verbose_name = "Waste Record"
        verbose_name_plural = "Waste Records"
        ordering = ['-collection_date']


class Task(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('REJECTED', 'Rejected'),
        ('ACCEPTED', 'Accepted'),
        ('COMPLETED', 'Completed'),
    ]

    waste_request = models.OneToOneField(
        Waste, 
        on_delete=models.CASCADE, 
        related_name='task',
        help_text="Associated waste request"
    )
    employee = models.ForeignKey(MyUser, related_name='tasks', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='PENDING')
    assigned_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    # proposer = models.ForeignKey(MyUser, on_delete=models.CASCADE)


    def save(self, *args, **kwargs):
        if self.status == 'COMPLETED' and not self.completed_at:
            self.completed_at = timezone.now()
            # Optionally update waste record status when task is completed
            self.waste_request.status = 'COMPLETED'
            self.waste_request.save()

        elif self.status == 'REJECTED' and not self.completed_at:
            # Update waste record status when rejected
            self.waste_request.status = 'REJECTED'
            self.waste_request.save()

        elif self.status == 'ACCEPTED' and not self.completed_at:
            # Update waste record status when accepted
            self.waste_request.status = 'ACCEPTED'
            self.waste_request.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Task for {self.employee.username} - {self.waste_request.location}"

    class Meta:
        verbose_name = "Task"
        verbose_name_plural = "Tasks"
        ordering = ['-assigned_at']
