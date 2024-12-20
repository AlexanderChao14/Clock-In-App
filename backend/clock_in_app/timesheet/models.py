from django.db import models

# Create your models here.
class TimeSheet(models.Model):
    # might need to be a string
    employeeId = models.CharField(max_length=6)
    firstName = models.CharField(max_length=128)
    lastName = models.CharField(max_length=128)
    # Might need to change this to a charfield
    clockIn = models.DateTimeField()
    clockOut = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.employeeId