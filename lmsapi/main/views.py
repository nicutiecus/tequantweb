import requests
import os
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .serializers import TeacherSerializer, StudentSerializer, CourseSerializer, ModuleSerializer, TopicSerializer, EnrollmentSerializer
from .models import Module, Topic, Course, Teacher, Student, Enrollment
from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser, AllowAny
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password

class TeacherList(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    #permission_classes = [permissions.IsAuthenticated]


class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    #permission_classes = [permissions.IsAuthenticated]
# Create your views here.

@csrf_exempt
def teacher_login(request): 
    email= request.POST['email']
    password= request.POST['password']
    try:
        teacherData = Teacher.objects.get(email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData = None
    if teacherData:
        return JsonResponse({'bool': True, 'teacherid': teacherData.id})
    else:
        return JsonResponse({'bool': False})

#Student

class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    #permission_classes = [permissions.IsAuthenticated]

class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    #permission_classes = [permissions.IsAuthenticated]


@csrf_exempt
def student_login(request): 
    email= request.POST['email']
    password= request.POST['password']
    studentData = Student.objects.get(email=email, password=password)
    if studentData:
        return JsonResponse({'bool': True})
    else:
        return JsonResponse({'bool': False})

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    #permission_classes = [permissions.IsAuthenticated]

class CourseDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint that allows Courses to be viewed.
    A Course is the primary learning resource container.
    """
    queryset = Course.objects.filter(is_published=True).order_by('title')
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]


class ModuleViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Modules to be viewed.
    Modules represent a major section within a course.
    """
    # Assuming Modules are ordered within a Course (e.g., course__id)
    queryset = Module.objects.all().order_by('course__id', 'order') 
    serializer_class = ModuleSerializer
    permission_classes = [AllowAny]


class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows Topics to be viewed.
    Topics are the smallest unit of content within a Module.
    """
    queryset = Topic.objects.all().order_by('module__id', 'order')
    serializer_class = TopicSerializer
    permission_classes = [AllowAny]

class EnrollmentView(generics.ListCreateAPIView):
    """
    API endpoint to handle student enrollment.
    Endpoint: POST /api/enroll/
    """
    permission_classes = [AllowAny] 
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def post(self, request, *args, **kwargs):
        serializer = EnrollmentSerializer(data=request.data)
        
        if serializer.is_valid():
            # 1. Save the student data to the database (Stored for reminders)
            enrollment = serializer.save()
            
            # 2. Construct the Email
            subject = f"Action Required: Complete your enrollment for {enrollment.course.title}"
            
            # This generates the unique link: https://tequant.ng/checkout/550e8400-e29b...
            checkout_link = f"https://tequant.ng/checkout/{enrollment.enrollment_id}"
            
            message = f"""
            Dear {enrollment.first_name},

            Thank you for registering for the course: {enrollment.course.title}.

            Your enrollment has been recorded, but your spot is not confirmed until payment is complete.
            
            Please click the link below to verify your details and make payment:
            {checkout_link}

            If you did not initiate this request, please ignore this email.

            Best regards,
            TE Quant Resources Team
            """

            '''# 3. Send the Email
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [enrollment.email],
                    fail_silently=False,
                )
            except Exception as e:
                # Log the error but allow the process to continue so the user isn't stuck
                print(f"Email sending failed: {e}")

            return Response({
                "message": f"Successfully enrolled in {enrollment.course.title}",
                "enrollment_id": enrollment.enrollment_id
            }, status=status.HTTP_201_CREATED)'''
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [enrollment.email],
                fail_silently=False, 
            )
            
            # If this line runs, the email definitely left Django
            print("Email sent successfully!") 

            return Response({
                "message": f"Successfully enrolled in {enrollment.course.title}",
                "enrollment_id": enrollment.enrollment_id
            }, status=status.HTTP_201_CREATED)
            
    
class CourseModuleList(generics.ListAPIView):
    serializer_class = ModuleSerializer

    def get_queryset(self):
        course_id=self.kwargs["course_id"]
        course= Course.objects.get(pk=course_id)
        return Module.objects.filter(course=course)
    
# lmsapi/views.py

class CheckoutInfoView(generics.RetrieveAPIView):
    """
    API endpoint to fetch enrollment details by UUID for the checkout page.
    Endpoint: GET /api/checkout-info/<enrollment_id>/
    """
    permission_classes = [AllowAny] # Must be public so users can pay without logging in
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer
    lookup_field = 'enrollment_id' # This tells Django to search by the UUID, not the ID

class VerifyPaymentView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reference = request.data.get('reference')
        enrollment_id = request.data.get('enrollment_id')

        if not reference or not enrollment_id:
            return Response({'error': 'Missing reference or enrollment ID'}, status=status.HTTP_400_BAD_REQUEST)

        # 1. Verify with Paystack API
        headers = {
            "Authorization": f"Bearer {os.environ.get('PAYSTACK_SECRET_KEY')}",
            "Content-Type": "application/json",
        }
        
        url = f"https://api.paystack.co/transaction/verify/{reference}"
        
        try:
            response = requests.get(url, headers=headers)
            response_data = response.json()

            if response_data['status'] and response_data['data']['status'] == 'success':
                try:
                    enrollment = Enrollment.objects.get(enrollment_id=enrollment_id)
                    enrollment.is_paid = True
                    enrollment.save()
                    
                    # --- NEW LOGIC HERE ---
                    # Check if this email already has a Student Profile
                    student_exists = Student.objects.filter(email=enrollment.email).exists()

                    return Response({
                        'message': 'Payment verified',
                        'student_exists': student_exists, # <--- Frontend uses this
                        'email': enrollment.email,
                        'first_name': enrollment.first_name
                    }, status=status.HTTP_200_OK)
                    # ----------------------

                except Enrollment.DoesNotExist:
                    return Response({'error': 'Enrollment not found'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'error': 'Payment verification failed'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            print(f"❌ SERVER ERROR: {str(e)}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class MyCoursesList(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [AllowAny] # In a real app, use IsAuthenticated

    def get_queryset(self):
        student_email = self.kwargs['email']
        # 1. Find all paid enrollments for this email
        paid_enrollments = Enrollment.objects.filter(email=student_email, is_paid=True)
        
        # 2. Extract the Course IDs
        course_ids = paid_enrollments.values_list('course_id', flat=True)
        
        # 3. Return the actual Course objects
        return Course.objects.filter(id__in=course_ids)
    


class StudentRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # New Name Logic
        surname = request.data.get('surname')
        first_name = request.data.get('first_name')
        other_name = request.data.get('other_name', '') # Default to empty string if missing
        
        if not surname or not first_name:
             return Response({'error': 'Surname and First Name are required'}, status=status.HTTP_400_BAD_REQUEST)

        if Student.objects.filter(email=email).exists():
            return Response({'error': 'Student already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
        # Combine them: "KEJEH Nikson Othername"
        # We strip() to remove trailing space if other_name is empty
        full_name_combined = f"{surname}, {first_name} {other_name}".strip()
        hashed_password=make_password(password)

        student = Student.objects.create(
            email=email,
            full_name=full_name_combined,
            password=hashed_password, 
            interested_categories='General'
        )
        return Response({'message': 'Profile created successfully'}, status=status.HTTP_201_CREATED)

# lmsapi/views.py

class StudentLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        try:
            # Find student by email
            student = Student.objects.get(email=email)
            
            # Verify Password (simple check since we stored it directly)
            # Note: In a real app, use hashing (check_password)
            if student.password == password:
                return Response({
                    'bool': True,
                    'student_id': student.id,
                    'email': student.email,
                    'full_name': student.full_name
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'bool': False,
                    'msg': 'Invalid Password'
                }, status=status.HTTP_400_BAD_REQUEST)
                
        except Student.DoesNotExist:
            return Response({
                'bool': False,
                'msg': 'Account does not exist'
            }, status=status.HTTP_404_NOT_FOUND)