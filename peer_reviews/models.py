from django.db import models
from users.models import CustomUser
from research_papers.models import ResearchPaper

class PeerReview(models.Model):
    paper = models.ForeignKey(ResearchPaper, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    review_text = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('rejected', 'Rejected')
    ])
    recommendation = models.CharField(max_length=20, choices=[
        ('accept', 'Accept'),
        ('revise', 'Revise'),
        ('reject', 'Reject')
    ])
    deadline = models.DateField()
    submitted_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review of {self.paper.title} by {self.reviewer.username}"
