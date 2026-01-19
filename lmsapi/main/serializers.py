from rest_framework import serializers
from .models import Module, Topic, Course, CourseCategory, Teacher, Student, Enrollment
from django.contrib.auth.models import User
from django.db import transaction
from django.utils.crypto import get_random_string

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
        fields = ['id','category','title','description','teacher', 'price', 'featured_img', 'course_modules']
        #depth = 1


"""class EnrollmentSerializer(serializers.ModelSerializer):
    '''
    Handles student enrollment. 
    Accepts 'course' as a string (title) from the frontend and looks up the Course object.
    '''
    # The default ModelSerializer would expect an Integer ID otherwise.
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = fields = ['id', 'enrollment_id', 'course', 'full_name', 'email', 'phone_number', 'address', 'is_paid', 'created_at']


    
    @transaction.atomic
    def create(self, validated_data):
        '''
        Creates an Enrollment. 
        Reuse existing User/Student if email matches, otherwise create new.
        '''
        name = validated_data.get('full_name')
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
            temp_password = get_random_string(length=12)
            user.set_password(temp_password)
            user.save()
            # In a real app, trigger an email here: send_welcome_email(user, temp_password)

        # 2. GET OR CREATE STUDENT PROFILE
        # Ensures we use the exact same Student ID if they enroll in a second course.
        student, _ = Student.objects.get_or_create(user=user)

        # 3. CREATE ENROLLMENT
        # We use get_or_create here too, to prevent enrolling in the EXACT same course twice.
        enrollment, enrollment_created = Enrollment.objects.get_or_create(
            email=email,
            course=course,
            defaults={
                'full_name': name,
                'phone_number': validated_data.get('phone_number'),
                'address': validated_data.get('address')
            }
        )
        
        return enrollment
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['course'] = {
            'id': instance.course.id,
            'title': instance.course.title,
            'price': instance.course.price,
        }
        return response 
        
"""
class EnrollmentSerializer(serializers.ModelSerializer):
    # INPUT: Expect a Course ID (Integer)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())
    
    class Meta:
        model = Enrollment
        # We only map fields that ACTUALLY exist in your Enrollment model
        fields = ['id', 'enrollment_id', 'course', 'first_name', 'email', 'is_paid', 'created_at']

    # We REMOVED the 'create' method. 
    # Django's default behavior is perfect here: it simply saves the Enrollment 
    # to the database without trying to create linked Users or Students.
    

    # OUTPUT: Show Course Title in the response (for frontend display)
    def to_representation(self, instance):
        response = super().to_representation(instance)
        try:
            response['course'] = {
                'id': instance.course.id,
                'title': instance.course.title,
                'price': instance.course.price,
            }
        except AttributeError:
            # Fallback if course data is missing
            pass
        return response