from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlist", views.PlaylistViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
