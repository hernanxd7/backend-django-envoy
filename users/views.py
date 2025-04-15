from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import UserSerializer, RegisterSerializer
from rest_framework import generics

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all() #
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer