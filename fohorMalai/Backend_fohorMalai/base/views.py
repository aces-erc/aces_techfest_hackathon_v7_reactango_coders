from .serializers import RegisterUserSerializer,MyUserSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view
from django.core.mail import send_mail
from django.conf import settings

from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.urls import reverse
from .models import MyUser
from django.contrib.auth import password_validation
from django.contrib.auth import get_user_model

from django.views.decorators.csrf import csrf_exempt



class CustomLogin(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        try:
            response= super().post(request,*args,**kwargs)
            tokens=response.data
            access_token=tokens['access']
            refresh_token=tokens['refresh']
            
            res=Response()
            res.data={'success':True}
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            res.set_cookie(
                key="refresh_token",
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            
            return res
        except:
            return Response({"Login":False})
        

class CustomRefresh(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token=request.COOKIES.get('refresh_token')
            request.data['refresh']=refresh_token
            response= super().post(request,*args,**kwargs)
            tokens=response.data
            access_token=tokens['access']
            
            res=Response()
            res.data={'success':True}
            res.set_cookie(
                key="access_token",
                value=access_token,
                httponly=True,
                secure=True,
                samesite="None",
                path='/'
            )
            
            
            return res
        except:
            return Response({"Refreshed":False})
        
            
@api_view(['POST'])
def log_out(request):
    try:
        res=Response()
        res.data={'success':True}
        res.delete_cookie('access_token',path='/',samesite='None')       
        res.delete_cookie('refresh_token',path='/',samesite='None')   
        return res
    except:
        return Response({
            "success":False
        })    
        
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_authenticated(req):
    return Response({'authenticated':True})


@api_view(['POST'])
def register(request):
    serializer=RegisterUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response({"error":"Not Valid Regsiter"})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def forgot_password(request):
    email = request.data.get("email")  # Using request.data for JSON input
    print(email)
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = get_user_model().objects.get(email=email)
        print(user)
    except get_user_model().DoesNotExist:
        return Response({"error": "User with this email does not exist"}, status=status.HTTP_404_NOT_FOUND)

    token_generator = PasswordResetTokenGenerator()
    token = token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.username))
    print("ya uid xa",uid)

    reset_url = request.build_absolute_uri(reverse("password-reset", kwargs={"uidb64": uid, "token": token}))
    print(reset_url)

    send_mail(
        subject="Password Reset Request",
        message=f"Click the link below to reset your password:\n{reset_url}",
        from_email=settings.EMAIL_HOST_USER,  
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def reset_password(request, uidb64, token):
    password = request.data.get("password")  # Using request.data for POST body (JSON)
    
    if not password:
        return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        username = urlsafe_base64_decode(uidb64).decode()
        user = get_user_model().objects.get(username=username)
    except (get_user_model().DoesNotExist, ValueError, TypeError):
        return Response({"error": "Invalid link"}, status=status.HTTP_400_BAD_REQUEST)

    token_generator = PasswordResetTokenGenerator()
    if not token_generator.check_token(user, token):
        return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

    # Validate the new password
    try:
        password_validation.validate_password(password, user)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(password)
    user.save()

    return Response({"message": "Password has been reset successfully"}, status=status.HTTP_200_OK)