from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from .views import CustomTokenObtainPairView,log_out,register,forgot_password,reset_password,waste_detail,waste_list,user_waste_list,delete_waste,get_user,accept_task,reject_task

urlpatterns = [
    # path('login/',UserLoginView.as_view(),name='Login'),
    path('login/',CustomTokenObtainPairView.as_view(),name='Login'),
    # path('refresh/',CustomRefresh.as_view(),name='refresh'),
    path('logout/',log_out,name='logout'),
    path('register/',register,name='register'),
    path('forgot-password/', forgot_password, name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', reset_password, name='password-reset'),
     # Waste record management
    path('wastes/', waste_list, name='waste-list'),
    path('wastes/<str:username>/', waste_detail, name='waste-detail'), 
    path('wastes/delete/<int:id>/', delete_waste, name='waste-delete'), 
    
    # Current user waste records
    path('my-wastes/', user_waste_list, name='user-waste-list'), 
    
    #user
    path('getUser/<str:pk>/', get_user, name='get_user'), 
    
    # Task-related URLs
    path('tasks/accept/<int:id>/', accept_task, name='accept_task'),
    path('tasks/<int:id>/reject/', reject_task, name='reject_task'),
    
    
  
    
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)