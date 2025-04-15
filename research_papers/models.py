from django.db import models

class ResearchPaper(models.Model):
    title = models.CharField(max_length=255) 
    abstract = models.TextField()
    authors = models.CharField(max_length=255)
    publication_date = models.DateField()
    journal = models.CharField(max_length=255, blank=True, null=True)
    doi = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.title