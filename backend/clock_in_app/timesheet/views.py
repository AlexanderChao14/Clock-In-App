from django.shortcuts import render
from rest_framework import generics
from timesheet.models import TimeSheet
from timesheet.serializers import TimeSheetSerializer
from rest_framework import viewsets

# # Create your views here.
# class TimeSheetListAPIView(generics.ListAPIView):
#     queryset = TimeSheet.objects.all()
#     serializer_class = TimeSheetSerializer


# # might not need this for a single entry view
# class TimeSheetAPIView(generics.RetrieveAPIView):
#     queryset = TimeSheet.objects.all()
#     serializer_class = TimeSheetSerializer

class TimeSheetViewSet(viewsets.ModelViewSet):
    queryset = TimeSheet.objects.all()
    serializer_class = TimeSheetSerializer