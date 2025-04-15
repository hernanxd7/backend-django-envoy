from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class Vendedor(models.Model):
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    dni = models.CharField(max_length=20, unique=True)
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20)
    fecha_contratacion = models.DateField()
    zona_asignada = models.CharField(max_length=100)
    porcentaje_comision = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    objetivo_ventas_mensual = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(0)]
    )
    estado = models.CharField(max_length=20, choices=[
        ('ACTIVO', 'Activo'),
        ('INACTIVO', 'Inactivo'),
        ('VACACIONES', 'Vacaciones'),
        ('SUSPENDIDO', 'Suspendido')
    ], default='ACTIVO')
    notas = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.nombre} {self.apellidos} - {self.zona_asignada}'

    class Meta:
        ordering = ['apellidos', 'nombre']
        verbose_name = 'Vendedor'
        verbose_name_plural = 'Vendedores'