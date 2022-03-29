from rest_framework import permissions, viewsets
from rest_framework.decorators import action

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, pk=None):
        pass