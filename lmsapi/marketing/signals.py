# marketing/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Lead, ScheduledEmail
from django.utils import timezone
from datetime import timedelta

@receiver(post_save, sender=Lead)
def create_email_schedule(sender, instance, created, **kwargs):
    if created:
        # Email 1: Immediate (Welcome)
        ScheduledEmail.objects.create(
            lead=instance,
            subject="Welcome to DataPro NG - Here is your Syllabus",
            body="Hi, thanks for joining...", # You would normally load this from a template
            scheduled_date=timezone.now()
        )
        
        # Email 2: 24 Hours Later (Pain Points)
        ScheduledEmail.objects.create(
            lead=instance,
            subject="Why some people get promoted",
            body="Let's be honest about the job market...",
            scheduled_date=timezone.now() + timedelta(days=1)
        )

        # Email 3: 4 Days Later (Urgency)
        ScheduledEmail.objects.create(
            lead=instance,
            subject="Only 4 spots left!",
            body="Don't miss out...",
            scheduled_date=timezone.now() + timedelta(days=4)
        )