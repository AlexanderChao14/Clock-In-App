from rest_framework import serializers
from timesheet.models import TimeSheet


class TimeSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSheet
        fields = ('id', 'employeeId',  'firstName', 'lastName', 'clockIn', 'clockOut')