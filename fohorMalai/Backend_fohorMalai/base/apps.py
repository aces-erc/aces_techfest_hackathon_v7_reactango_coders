from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "base"




# from django.apps import AppConfig

# class YourAppConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'base' 

#     def ready(self):
#         import base.utils.signals