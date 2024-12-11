from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from .views import CustomLogin,CustomRefresh,log_out,register,forgot_password,reset_password

urlpatterns = [
    path('login/',CustomLogin.as_view(),name='Login'),
    path('refresh/',CustomRefresh.as_view(),name='refresh'),
    path('logout/',log_out,name='logout'),
    path('register/',register,name='register'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', reset_password, name='password-reset'),
  
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)