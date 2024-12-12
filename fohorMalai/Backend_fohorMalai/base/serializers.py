from datetime import timezone
from rest_framework import serializers
from .models import MyUser,Waste,Task
from django.contrib.auth import authenticate


class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model=MyUser
        fields = [ 'username', 'email', 'role', 'profile_image','phone']



class RegisterUserSerializer(serializers.ModelSerializer):
        password=serializers.CharField(write_only=True)
        class Meta:
            model=MyUser
            fields=['username','email','role','password','phone']
        
        def create(self,validated_data):
            
            user= MyUser(
                username=validated_data['username'],
                email=validated_data['email'],
                role=validated_data['role'],
                phone=validated_data['phone']
            )
            user.set_password(validated_data['password'])
            user.save()
            return user
 
class UserLoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = MyUser
        fields = ["username", "password"]

    def validate(self, data):
        """
        Validate the user credentials (username and password).
        """
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            raise serializers.ValidationError("Username and password are required.")

        user = authenticate(username=username, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid username or password.")
        
        # Returning the user object will help in the view to manage authentication tokens
        data['user'] = user
        return data

# class WasteSerializer(serializers.ModelSerializer):
#     # Display fields for choice fields
#     waste_type_display = serializers.CharField(
#         source='get_waste_type_display', read_only=True)
#     location_display = serializers.CharField(
#         source='get_location_display', read_only=True)
#     urgency_display = serializers.CharField(
#         source='get_urgency_display', read_only=True)
#     status_display = serializers.CharField(
#         source='get_status_display', read_only=True)
#     # User reference fields
#     username = serializers.CharField(
#         write_only=True, required=False)
    
#     class Meta:
#         model = Waste
#         fields = [
#             'id',
#             'waste_type',
#             'waste_type_display',
#             'waste_weight',
#             'location',
#             'location_display',
#             'urgency',
#             'urgency_display',
#             'collection_date',
#             'description',
#             'username',
#         ]
#         read_only_fields = ['id','collection_date']

#     def validate_waste_weight(self, value):
#         if value <= 0:
#             raise serializers.ValidationError("Waste weight must be a positive number.")
#         return value

#     def validate(self, data):
#         if data.get('waste_type') == 'NON' and data.get('urgency') == 'LOW':
#             raise serializers.ValidationError({
#                 "urgency": "Non-biodegradable waste should be marked as high urgency."
#             })
#         return data

#     def create(self, validated_data):
#         username = validated_data.pop('username', None)
#         if username:
#             try:
#                 user = MyUser.objects.get(username=username)
#                 validated_data['user'] = user
#             except MyUser.DoesNotExist:
#                 raise serializers.ValidationError({"username": "User not found."})
        
#         return Waste.objects.create(**validated_data)


class WasteSerializer(serializers.ModelSerializer):
    # Display fields for choice fields
    waste_type_display = serializers.CharField(
        source='get_waste_type_display', read_only=True)
    location_display = serializers.CharField(
        source='get_location_display', read_only=True)
    urgency_display = serializers.CharField(
        source='get_urgency_display', read_only=True)
    status_display = serializers.CharField(
        source='get_status_display', read_only=True)  # Display for waste status
    
    # User reference fields
    username = serializers.CharField(
        write_only=True, required=False)
    
    class Meta:
        model = Waste
        fields = [
            'id',
            'waste_type',
            'waste_type_display',
            'waste_weight',
            'location',
            'location_display',
            'urgency',
            'urgency_display',
            'collection_date',
            'description',
            'username',
            'status',           # Added status field
            'status_display',   # Added status display field
        ]
        read_only_fields = ['id','collection_date']

    def validate_waste_weight(self, value):
        if value <= 0:
            raise serializers.ValidationError("Waste weight must be a positive number.")
        return value

    def validate(self, data):
        if data.get('waste_type') == 'NON' and data.get('urgency') == 'LOW':
            raise serializers.ValidationError({
                "urgency": "Non-biodegradable waste should be marked as high urgency."
            })
        return data

    def create(self, validated_data):
        username = validated_data.pop('username', None)
        if username:
            try:
                user = MyUser.objects.get(username=username)
                validated_data['user'] = user
            except MyUser.DoesNotExist:
                raise serializers.ValidationError({"username": "User not found."})
        
        return Waste.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # Ensure the waste status is updated when creating or modifying the waste record
        if 'status' in validated_data:
            instance.status = validated_data['status']
        return super().update(instance, validated_data)








from rest_framework import serializers
from .models import Task, Waste, MyUser

class TaskSerializer(serializers.ModelSerializer):
    waste_request = serializers.StringRelatedField()
    employee = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = ['id', 'waste_request', 'employee', 'status', 'assigned_at', 'completed_at']





# class TaskSerializer(serializers.ModelSerializer):
#     waste_request = WasteSerializer(read_only=True)  # Nested Waste serializer
#     employee = MyUserSerializer(read_only=True)  # Display employee details
#     waste_status_display = serializers.CharField(
#         source='waste_request.get_status_display', read_only=True)  # Display the waste status

#     class Meta:
#         model = Task
#         fields = [
#             'id',
#             'waste_request',
#             'employee',
#             'status',
#             'assigned_at',
#             'completed_at',
#             'waste_status_display',  # Display the waste status for reference
#         ]
#         read_only_fields = ['id', 'assigned_at', 'completed_at']

#     def validate(self, data):
#         # Add any custom validation if necessary. For example, you could add a validation
#         # to ensure that a task cannot be completed if the waste status is not appropriate.
#         if data.get('status') == 'COMPLETED' and not data.get('completed_at'):
#             raise serializers.ValidationError("Completed tasks must have a completion date.")
#         return data

#     def update(self, instance, validated_data):
#         # Handling status changes on the task.
#         if 'status' in validated_data and validated_data['status'] == 'COMPLETED':
#             instance.completed_at = timezone.now()  # Set completion date when the task is completed
#         return super().update(instance, validated_data)