from django.shortcuts import get_object_or_404
from rest_framework import permissions, viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response

from . import models, serializers


class TrackViewSet(viewsets.ModelViewSet):
    queryset = models.Track.objects.all()
    serializer_class = serializers.TrackSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all()
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        print(user)

    def create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, pk=None):
        pass


@api_view(['POST'])
def add_items(request):
    item = serializers.PlaylistSerializer(data=request.data)
    if item.is_valid():
        print("saving")
        item.save()
        return Response(item.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_playlist(request, id: int):
    print("hola")
    print(id)
    playlist = get_object_or_404(models.Playlist, id=id)
    playlist.delete()
    return {"success": True}
