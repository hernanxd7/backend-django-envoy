from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RegisterView

# Forma 1
router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('', include(router.urls)), # Forma 1
    path('register/', RegisterView.as_view(), name='register'), # Forma 2
]
