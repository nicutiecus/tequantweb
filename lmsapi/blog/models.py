from django.db import models
from django.utils.text import slugify
from main.models import Staff
from django.contrib.auth.models import User
from django.utils import timezone # Best practice for publish dates
import time # Import at top level

class Category(models.Model):
    title = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.title

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    # Ensure you have 'Pillow' installed for ImageField
    profile_pic = models.ImageField(upload_to='profile-pics/', blank=True, null=True)

    def __str__(self):
        return self.user.username

class Post(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=191, unique_for_date='publish')
    author = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='blog_posts')
    body = models.TextField()
    
    # BEST PRACTICE FIX: Use default=timezone.now so you can edit the publish date later
    publish = models.DateTimeField(default=timezone.now)
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=10, choices=(('draft', 'Draft'), ('published', 'Published')), default='draft')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts')
    
    # BEST PRACTICE FIX: Use ImageField for uploads instead of CharField
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    class Meta:
        ordering = ('-publish',)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        
        # Safety check: if slug is STILL empty, use timestamp
        if not self.slug:
             self.slug = f"post-{int(time.time())}" 
             
        super(Post, self).save(*args, **kwargs)

    def __str__(self):
        return self.title 

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Comment by {self.author.username} on {self.post.title}'