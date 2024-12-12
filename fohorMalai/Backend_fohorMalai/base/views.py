from .serializers import RegisterUserSerializer,MyUserSerializer, UserLoginSerializer
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from rest_framework.exceptions import AuthenticationFailed

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
from .models import MyUser,Waste,Task
from django.contrib.auth import password_validation
from django.contrib.auth import get_user_model
from .serializers import WasteSerializer,TaskSerializer
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from rest_framework.views import APIView
from django.contrib.auth import authenticate

from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.tokens import RefreshToken


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        # Parse user credentials
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            raise AuthenticationFailed("Username and password are required")

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user is None:
            raise AuthenticationFailed("Invalid credentials")

        # If user is authenticated, generate JWT tokens
        serializer = UserLoginSerializer(user)
        response = super().post(request, *args, **kwargs)  # Generate tokens

        # Include the user information in the response (optional)
        tokens = response.data
        access_token = tokens['access']
        refresh_token = tokens['refresh']

        # You can include user-related information like username in the response if desired
        return Response({
            'success': True,
            'access_token': access_token,
            'refresh_token': refresh_token,
            'username': user.username,  # You can also return any other user information if needed
                 # Including the user_id for reference
        }, status=status.HTTP_200_OK)



# class UserLoginView(APIView):
#     def post(self, request):
#         serializer = UserLoginSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.validated_data['user']
#             # You can now return a token or success response
#             return Response({"message": "Login successful", "user": user.username}, status=status.HTTP_200_OK)
        
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User = get_user_model()

# # generate token manually 
# def get_token_for_user(user):
#     refresh = RefreshToken.for_user(user)

#     return {
#         'refresh': str(refresh),
#         'access': str(refresh.access_token),
#     }

# class UserLoginView(APIView):
#     def post(self, request, format=None):
#         serializer = UserLoginSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         username = serializer.data.get("username")
#         password = serializer.data.get("password")
#         user = authenticate(username=username, password=password)
#         if user is not None:
#             token = get_token_for_user(user)
#             print(token)
#             response = Response()
            
#             response.data = {"message": "login successfull", "access": token.get("access"), "refresh": token.get("refresh")}
#             response.status_code = 200
#             return response 
#         else:
#             return Response({"error": "Invalid username or password"}, status=status.HTTP_404_NOT_FOUND)


# class CustomLogin(TokenObtainPairView):
#     def post(self,request,*args,**kwargs):
#         try:
#             response= super().post(request,*args,**kwargs)
#             tokens=response.data
#             access_token=tokens['access']
#             refresh_token=tokens['refresh']
            
#             res=Response()
#             res.data={'success':True}
#             res.set_cookie(
#                 key="access_token",
#                 value=access_token,
#                 httponly=True,
#                 secure=True,
#                 samesite="None",
#                 path='/'
#             )
#             res.set_cookie(
#                 key="refresh_token",
#                 value=refresh_token,
#                 httponly=True,
#                 secure=True,
#                 samesite="None",
#                 path='/'
#             )
            
#             return res
#         except:
#             return Response({"Login":False})
        

# class CustomRefresh(TokenRefreshView):
#     def post(self,request,*args,**kwargs):
#         try:
#             refresh_token=request.COOKIES.get('refresh_token')
#             request.data['refresh']=refresh_token
#             response= super().post(request,*args,**kwargs)
#             tokens=response.data
#             access_token=tokens['access']
            
#             res=Response()
#             res.data={'success':True}
#             res.set_cookie(
#                 key="access_token",
#                 value=access_token,
#                 httponly=True,
#                 secure=True,
#                 samesite="None",
#                 path='/'
#             )
            
            
#             return res
#         except:
#             return Response({"Refreshed":False})
        
            
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




@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def waste_list(request):
    """
    List all waste records or create a new waste record
    """
    
   
    if request.method == 'GET':
        # Get all waste records
        wastes = Waste.objects.all()
        serializer = WasteSerializer(wastes, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        # Create a new waste record
        serializer = WasteSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT'])
# @permission_classes([IsAuthenticated])
def waste_detail(request, username):
    """
    Retrieve, update, or delete a specific user's waste record
    """
    try:
        user = MyUser.objects.get(username=username)
        waste = Waste.objects.get(user=user)
    except (MyUser.DoesNotExist, Waste.DoesNotExist):
        return Response({"error": "Record not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        # Retrieve a specific waste record
        serializer = WasteSerializer(waste)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        # Update a specific waste record
        serializer = WasteSerializer(waste, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_waste(request, id):
    """
    Delete a specific waste record by its unique ID
    """
    try:
        # Fetch the waste object using the provided id
        waste = Waste.objects.get(id=id)

        # Ensure the waste record belongs to the authenticated user
        if waste.user != request.user:
            return Response({"error": "You are not authorized to delete this record."}, status=status.HTTP_403_FORBIDDEN)

        # Delete the waste record
        waste.delete()

        return Response({"message": "Waste record deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    except Waste.DoesNotExist:
        return Response({"error": "Waste record not found."}, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_waste_list(request):
    """
    Get waste records for the currently authenticated user
    """
    # Filter waste records linked to the authenticated user
    wastes = Waste.objects.filter(user=request.user)
    serializer = WasteSerializer(wastes, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(requset,pk):
    try:
        user=MyUser.objects.get(username=pk)
        serializer=MyUserSerializer(user,many=False)
        return Response(serializer.data)
        
    except Exception as e:
        return Response({'error': "error getting user data", 'details': str(e)}, status=500)
    
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def accept_task(request, id):
    try:
        print(request.user)
        print("ya samma aayo")
        waste = Waste.objects.get(id=id)
        print(waste)
        # Ensure the waste record belongs to the authenticated user
        if waste.user != request.user:
            return Response({"error": "You are not authorized to accept this waste."}, 
                            status=status.HTTP_403_FORBIDDEN)

        waste.status = 'Accepted'
        waste.save()
        serializer = WasteSerializer(waste)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Waste.DoesNotExist:
        return Response({'error': 'Waste not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def reject_task(request, id):
    try:
        waste = Waste.objects.get(id=id)

        # Ensure the waste record belongs to the authenticated user
        if waste.user != request.user:
            return Response({"error": "You are not authorized to reject this waste."}, 
                            status=status.HTTP_403_FORBIDDEN)

        waste.status = 'Rejected'
        waste.save()
        serializer = WasteSerializer(waste)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Waste.DoesNotExist:
        return Response({'error': 'Waste not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def get_helllo(request):
    return Response({"Mesage":"hello"})



@api_view(['GET'])
def get_role_from_username(request, pk):
    try:
        user = MyUser.objects.get(username=pk)
        return Response({"role": user.role})
    except MyUser.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except Exception as e:
        return Response({"error": f"Error in getting role: {str(e)}"}, status=500)