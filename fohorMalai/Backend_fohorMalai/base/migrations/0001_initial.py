# Generated by Django 5.1.4 on 2024-12-12 20:01

import django.contrib.auth.models
import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('username', models.CharField(max_length=69, primary_key=True, serialize=False, unique=True)),
                ('role', models.CharField(choices=[('NU', 'Normal User'), ('WC', 'Work Collector')], max_length=15)),
                ('phone', models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator('^\\d{10}$', 'Enter a valid phone number.')])),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='profile_image/')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Waste',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('waste_type', models.CharField(choices=[('BIO', 'Biodegradable'), ('NON', 'Non-Biodegradable')], help_text='Type of waste', max_length=3)),
                ('waste_weight', models.DecimalField(decimal_places=2, help_text='Weight of waste in kilograms', max_digits=10, validators=[django.core.validators.MinValueValidator(0)])),
                ('location', models.CharField(choices=[('ITH', 'Itahari'), ('KTM', 'Kathmandu'), ('SAG', 'Sagarmatha')], help_text='Collection location', max_length=3)),
                ('urgency', models.CharField(choices=[('LOW', 'Low Priority'), ('HIGH', 'High Priority')], default='LOW', help_text='Urgency of waste management', max_length=4)),
                ('collection_date', models.DateTimeField(auto_now_add=True, help_text='Date and time of waste collection')),
                ('description', models.TextField(blank=True, help_text='Additional details about the waste', null=True)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('REJECTED', 'Rejected'), ('ACCEPTED', 'Accepted'), ('COMPLETED', 'Completed')], default='PENDING', help_text='Status of the waste proposal (Pending, Accepted, Rejected)', max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='waste_records', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Waste Record',
                'verbose_name_plural': 'Waste Records',
                'ordering': ['-collection_date'],
            },
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('REJECTED', 'Rejected'), ('ACCEPTED', 'Accepted'), ('COMPLETED', 'Completed')], default='PENDING', max_length=10)),
                ('assigned_at', models.DateTimeField(auto_now_add=True)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL)),
                ('waste_request', models.OneToOneField(help_text='Associated waste request', on_delete=django.db.models.deletion.CASCADE, related_name='task', to='base.waste')),
            ],
            options={
                'verbose_name': 'Task',
                'verbose_name_plural': 'Tasks',
                'ordering': ['-assigned_at'],
            },
        ),
    ]
