from django.db import models

class Conductor(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    licencia = models.CharField(max_length=50)
    telefono = models.CharField(max_length=20)
    fecha_contratacion = models.DateField()
    estado = models.CharField(max_length=20, default='Activo')
    experiencia_anos = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.nombre} {self.apellido}"