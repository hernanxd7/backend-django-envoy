from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PeerReviewViewSet

router = DefaultRouter()
router.register(r'', PeerReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]