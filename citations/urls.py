from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CitationViewSet

router = DefaultRouter()
router.register(r'', CitationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]