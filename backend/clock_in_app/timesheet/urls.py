from django.urls import path
# from timesheet.views import TimeSheetListAPIView
from timesheet.views import TimeSheetViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('',TimeSheetViewSet, basename='timesheet')
urlpatterns = router.urls