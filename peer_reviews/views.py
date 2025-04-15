from rest_framework import viewsets
from .models import PeerReview
from .serializers import PeerReviewSerializer
from rest_framework.permissions import IsAuthenticated

class PeerReviewViewSet(viewsets.ModelViewSet):
    queryset = PeerReview.objects.all()
    serializer_class = PeerReviewSerializer
    permission_classes = [IsAuthenticated]
