# lmsapi/authentication.py
from rest_framework import authentication
from rest_framework import exceptions
from .models import Student

class StudentTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # 1. Look for the 'Authorization' header
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        
        if not auth_header:
            return None # No header, so anonymous user

        try:
            # 2. Split 'Bearer <token_string>'
            token_type, token_str = auth_header.split()
            
            # 3. Find the student with this token
            student = Student.objects.get(login_token=token_str)
            
            # 4. Success! Return the student object
            return (student, None)
            
        except (ValueError, Student.DoesNotExist):
            raise exceptions.AuthenticationFailed('Invalid Token')