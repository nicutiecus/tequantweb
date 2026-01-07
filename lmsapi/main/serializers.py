from rest_framework import serializers
from .models import Module, Topic, Course, CourseCategory, Teacher, Student, Enrollment
from django.contrib.auth.models import User
from django.db import transaction

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id','full_name','email','password', 'role','bio', 'image']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','full_name','email','password','interested_categories']



class TopicSerializer(serializers.ModelSerializer):
    """
    Serializer for the Topic model (the smallest unit of content).
    """
    class Meta:
        model = Topic
        fields = ('id', 'title', 'content_type', 'duration_minutes', 'order')


class ModuleSerializer(serializers.ModelSerializer):
    """
    Serializer for the Module model.
    It nests the TopicSerializer to display all topics belonging to a module.
    """
    topics = TopicSerializer(many=True, read_only=True) # Assuming 'topics' is the related_name from Topic to Module

    class Meta:
        model = Module
        # Assuming module links back to a Course via a ForeignKey, and has duration properties
        fields = ('id', 'title', 'course', 'topics')

class CourseSerializer(serializers.ModelSerializer):
    #modules = ModuleSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ['category','title','description','teacher', 'price', 'featured_img', 'course_modules']
        #depth = 1


class EnrollmentSerializer(serializers.ModelSerializer):
    """
    Handles student enrollment. 
    Accepts 'course' as a string (title) from the frontend and looks up the Course object.
    """
    # We define 'course' as a CharField here to accept the TITLE string from your frontend.
    # The default ModelSerializer would expect an Integer ID otherwise.
    course = serializers.CharField() 

    class Meta:
        model = Enrollment
        fields = ['id', 'name', 'email', 'course', 'enrolled_at']

    def validate_course(self, value):
        """
        Check if the course with the given title exists in the database.
        """
        # Case-insensitive lookup to be user-friendly
        try:
            course_obj = Course.objects.get(title__iexact=value)
            return course_obj
        except Course.DoesNotExist:
            raise serializers.ValidationError(f"Course with title '{value}' not found.")

    
    @transaction.atomic
    def create(self, validated_data):
        """
        Creates an Enrollment. 
        Reuse existing User/Student if email matches, otherwise create new.
        """
        name = validated_data.get('name')
        email = validated_data.get('email')
        course = validated_data.get('course') # This is the resolved Course object

        # 1. PREVENT DUPLICATE USER/PROFILE
        # get_or_create checks if a user with this email (username) already exists.
        # If yes -> returns existing user. If no -> creates new one.
        user, user_created = User.objects.get_or_create(
            username=email, 
            defaults={
                'email': email,
                'first_name': name.split(' ')[0],
                'last_name': ' '.join(name.split(' ')[1:]) if ' ' in name else '',
            }
        )

        if user_created:
            # Only set password for NEW users
            temp_password = User.objects.make_random_password()
            user.set_password(temp_password)
            user.save()
            # In a real app, trigger an email here: send_welcome_email(user, temp_password)

        # 2. GET OR CREATE STUDENT PROFILE
        # Ensures we use the exact same Student ID if they enroll in a second course.
        student, _ = Student.objects.get_or_create(user=user)

        # 3. CREATE ENROLLMENT
        # We use get_or_create here too, to prevent enrolling in the EXACT same course twice.
        enrollment, enrollment_created = Enrollment.objects.get_or_create(
            student=student,
            course=course,
            defaults={
                'name': name,
                'email': email
            }
        )
        
        return enrollment