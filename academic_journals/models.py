from django.db import models
from users.models import CustomUser

class AcademicJournal(models.Model):
    title = models.CharField(max_length=200)
    issn = models.CharField(max_length=9, unique=True)
    publisher = models.CharField(max_length=200)
    impact_factor = models.FloatField()
    editor_in_chief = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True)
    scope = models.TextField()
    website = models.URLField()
    publication_frequency = models.CharField(max_length=50)
    peer_reviewed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
