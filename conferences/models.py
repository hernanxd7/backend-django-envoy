from django.db import models
from users.models import CustomUser
from research_papers.models import ResearchPaper

class Conference(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateField()
    location = models.CharField(max_length=200)
    organizer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    papers = models.ManyToManyField(ResearchPaper, related_name='conferences')
    submission_deadline = models.DateField()
    conference_website = models.URLField()
    status = models.CharField(max_length=20, choices=[
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
