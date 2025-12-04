from django.db import models
from django.utils import timezone
from datetime import timedelta

class Lead(models.Model):
    first_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='new', choices=[('new', 'New'), ('converted', 'Converted')])

    def __str__(self):
        return f"{self.first_name} ({self.email})"

class ScheduledEmail(models.Model):
    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='scheduled_emails')
    subject = models.CharField(max_length=200)
    body = models.TextField()
    scheduled_date = models.DateTimeField()
    is_sent = models.BooleanField(default=False)
    sent_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"To: {self.lead.email} | When: {self.scheduled_date}"