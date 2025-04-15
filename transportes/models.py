from django.db import models
from django.core.validators import MinValueValidator
from conductores.models import Conductor

class Transporte(models.Model):
    matricula = models.CharField(max_length=20, unique=True)
    marca = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    año = models.IntegerField(validators=[MinValueValidator(1900)])
    capacidad_carga = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    tipo_vehiculo = models.CharField(max_length=50, choices=[
        ('CAMION', 'Camión'),
        ('FURGONETA', 'Furgoneta'),
        ('TRAILER', 'Tráiler'),
        ('OTRO', 'Otro')
    ])
    conductor = models.ForeignKey(
        Conductor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='transportes'
    )
    estado = models.CharField(max_length=50, choices=[
        ('DISPONIBLE', 'Disponible'),
        ('EN_RUTA', 'En Ruta'),
        ('MANTENIMIENTO', 'En Mantenimiento'),
        ('FUERA_SERVICIO', 'Fuera de Servicio')
    ], default='DISPONIBLE')
    fecha_ultimo_mantenimiento = models.DateField(null=True, blank=True)
    kilometraje = models.IntegerField(validators=[MinValueValidator(0)])
    notas = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.marca} {self.modelo} - {self.matricula}'

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Transporte'
        verbose_name_plural = 'Transportes'