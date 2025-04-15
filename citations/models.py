from django.db import models
from research_papers.models import ResearchPaper

class Citation(models.Model):
    citing_paper = models.ForeignKey(ResearchPaper, on_delete=models.CASCADE, related_name='citations_made')
    cited_paper = models.ForeignKey(ResearchPaper, on_delete=models.CASCADE, related_name='citations_received')
    citation_context = models.TextField()
    page_number = models.IntegerField()
    citation_date = models.DateField(auto_now_add=True)
    impact_score = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.citing_paper.title} cites {self.cited_paper.title}"
