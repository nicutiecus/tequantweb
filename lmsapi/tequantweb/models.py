from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
# Create your models here.

"""class User(AbstractUser):
    class Roles(models.TextChoices):
        STUDENT = 'STUDENT', _('Student')
        TEACHER = 'TEACHER', _('Teacher')
        ADMIN = 'ADMIN', _('Super Admin')
        MARKETING = 'MARKETING', _('Marketing Staff')
        COMMUNITY = 'COMMUNITY', _('Community Manager')
        DATA_ANALYST = 'ANALYST', _('Data Analyst')

    role = models.CharField(max_length=20, choices=Roles.choices, default=Roles.STUDENT)
    phone_number = models.CharField(max_length=15, blank=True)
    
    # For Marketing Staff/Admins to manage permissions
    is_staff_member = models.BooleanField(default=False)"""



#Cohort waitlist
class CohortWaitList(models.Model):
    full_name= models.CharField(max_length=225)
    email= models.CharField(max_length=225)
    interested_course=models.CharField(max_length=225)
    time = models.DateField(auto_now_add=True)
