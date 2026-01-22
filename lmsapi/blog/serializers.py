from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class PostSerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(source='Post.slug', read_only=True)
    category_title = serializers.CharField(source='category.title', read_only=True)
    author_name = serializers.CharField(source='author.full_name', read_only =True)
    class Meta:
        model = models.Post
        fields=['id','title','slug','author','author_name','image','body','publish',
                'created','updated','status','category_title','category']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= models.Category
        fields=['id','title']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = models.Profile
        fields = ['user', 'bio', 'profile_picture']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        models.Profile.objects.create(user=user) # Create a profile for the new user
        return user

class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = models.Comment
        fields = ['id', 'author', 'content', 'created_at']