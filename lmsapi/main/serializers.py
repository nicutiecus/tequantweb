from rest_framework import serializers
from .models import Module, Topic, Course, CourseCategory, Teacher, Student, Enrollment

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
        fields = ('id', 'title', 'description', 'course', 'topics', 'total_duration')

class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    class Meta:
        model = Course
        fields = ['category','title','description','teacher', 'price', 'featured_image']


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

    def create(self, validated_data):
        """
        Create the Enrollment instance using the resolved Course object.
        """
        # validated_data['course'] is now the actual Course object returned by validate_course
        return Enrollment.objects.create(**validated_data)