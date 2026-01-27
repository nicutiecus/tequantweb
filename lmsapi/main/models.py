from django.db import models
import uuid

#Teacher model
class Teacher(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    role = models.CharField(default="staff", max_length=200)
    bio = models.TextField(default="no bio yet")
    image = models.CharField(default="no pic yet", max_length=225)

    def __str__(self):
        return self.full_name


class CourseCategory(models.Model):
    title= models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Course Categories"


class Course(models.Model):
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE)
    title= models.CharField(max_length=200)
    description = models.TextField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="teacher_courses")
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # In Naira
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Module(models.Model):
    title = models.CharField(max_length=225)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="course_modules")
    order = models.PositiveIntegerField(default="0")

    def __str__(self):
        return self.title

class Topic(models.Model):
    title = models.CharField(max_length=225)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    note = models.TextField()
    video = models.URLField()
    order = models.PositiveIntegerField(default="0")

    def __str__(self):
        return self.title

# --- Assessment Models ---
class Exam(models.Model):
    course = models.ForeignKey(Course, related_name='exams', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    duration_minutes = models.IntegerField()
    
class Question(models.Model):
    exam = models.ForeignKey(Exam, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField()
    # Simplified options structure; could be a separate model
    option_a = models.CharField(max_length=200)
    option_b = models.CharField(max_length=200)
    option_c = models.CharField(max_length=200)
    option_d = models.CharField(max_length=200)
    correct_option = models.CharField(max_length=1, choices=[('A','A'), ('B','B'), ('C','C'), ('D','D')])

class Student(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)
    interested_categories = models.TextField()
    profile_img = models.ImageField(upload_to='student_profiles', null=True, blank=True)
    # 👇 NEW: Store the login token here
    login_token = models.CharField(max_length=100, blank=True, null=True)

    # 👇 NEW: Required for Django permissions to work
    @property
    def is_authenticated(self):
        return True
    
    def __str__(self):
        return self.full_name


class Enrollment(models.Model):
    # This ID will be used in the URL: /checkout/550e8400-e29b...
    enrollment_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    
    # Link to your existing Course model
    course = models.ForeignKey('Course', on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrolled_courses', null=True, blank=True)
    
    first_name = models.CharField(max_length=200)
    email = models.EmailField()
    
    # Track status
    is_paid = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.first_name} - {self.course.title}"







class Staff(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=200)
    role = models.CharField(max_length=100, default='Editor')
    image = models.ImageField(upload_to='staff_imgs/', null=True)
    login_token = models.CharField(max_length=100, blank=True, null=True)
    # Access Controls
    can_create_blog = models.BooleanField(default=True)
    can_publish_blog = models.BooleanField(default=False) # Requires admin approval
    can_view_students = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def is_authenticated(self):
        return True

    def __str__(self):
        return f"{self.full_name} ({self.role})"
    
    class Meta:
        verbose_name_plural = "Staff Members"

