from rest_framework import serializers
from .models import PeerReview

class PeerReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeerReview
        fields = '__all__'