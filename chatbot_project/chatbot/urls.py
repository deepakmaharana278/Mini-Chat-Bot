from django.urls import path
from .views import ChatbotView

urlpatterns = [
    path("api/", ChatbotView.as_view(), name="chat"),
]
