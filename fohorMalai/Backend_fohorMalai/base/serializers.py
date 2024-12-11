from rest_framework import serializers
from .models import MyUser

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
