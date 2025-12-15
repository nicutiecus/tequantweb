from django.db import models

#Teacher model
class Teacher(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    role = models.CharField(default="null", max_length=200)
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
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    featured_img = models.ImageField(upload_to='course_imgs/', null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0) # In Naira
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title

class Student(models.Model):
    full_name= models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    interested_categories = models.TextField()

class Module(models.Model):
    title = models.CharField(max_length=225)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
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



class Enrollment(models.Model):
    """
    Records a student's registration for a specific course.
    """
    name = models.CharField(max_length=255, help_text="Student's Full Name")
    email = models.EmailField(help_text="Student's Email Address")
    
    # Link to the Course model. 
    # on_delete=models.CASCADE means if the course is deleted, enrollments are too.
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    
    enrolled_at = models.DateTimeField(auto_now_add=True)
    
    # Status fields (Useful for future payment integration)
    is_paid = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - {self.course.title}"

