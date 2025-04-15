from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AcademicJournalViewSet

router = DefaultRouter()
router.register(r'', AcademicJournalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]