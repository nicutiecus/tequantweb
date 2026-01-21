from django.contrib import admin
from . import models
from django.contrib.auth.hashers import make_password # <--- IMPORTANT IMPORT
from .models import Staff

# Register your models here.
admin.site.register(models.Teacher)
admin.site.register(models.Course)
admin.site.register(models.CourseCategory)
admin.site.register(models.Student)
admin.site.register(models.Enrollment)
admin.site.register(models.Module)
admin.site.register(models.Topic)






class StaffAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'email', 'role', 'can_create_blog', 'can_publish_blog')
    
    # THIS FUNCTION IS CRITICAL:
    # It intercepts the save and hashes the password before writing to DB
    def save_model(self, request, obj, form, change):
        # Only hash if the password has changed (or is new)
        if 'password' in form.changed_data:
            obj.password = make_password(obj.password)
        super().save_model(request, obj, form, change)

admin.site.register(Staff, StaffAdmin)
# ... register your other models ...


