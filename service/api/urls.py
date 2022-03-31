from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"tracks", views.TrackViewSet)
router.register(r"playlist", views.PlaylistViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('create', views.add_items, name='add-items'),
    path('delete/<int:id>/', views.delete_playlist, name='delete-items'),

]
