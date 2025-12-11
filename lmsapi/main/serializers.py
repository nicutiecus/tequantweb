from rest_framework import serializers
from .models import Module, Topic, Course, CourseCategory, Teacher, Student

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