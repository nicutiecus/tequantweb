from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .serializers import TeacherSerializer, StudentSerializer, CourseSerializer, ModuleSerializer, TopicSerializer, EnrollmentSerializer
from .models import Module, Topic, Course, Teacher, Student
from rest_framework import viewsets, status
from rest_framework.permissions import IsAdminUser, AllowAny

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

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
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

class EnrollmentView(APIView):
    """
    API endpoint to handle student enrollment.
    Endpoint: POST /api/enroll/
    """
    permission_classes = [AllowAny] # Allow public access for registration

    def post(self, request, format=None):
        serializer = EnrollmentSerializer(data=request.data)
        
        if serializer.is_valid():
            enrollment = serializer.save()
            return Response({
                "message": f"Successfully enrolled in {enrollment.course.title}s",
                "enrollment_id": enrollment.id
            }, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)