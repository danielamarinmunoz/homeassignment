import string
import random

from rest_framework import serializers

from . import models


class TrackSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True, required=False)
    moods = serializers.StringRelatedField(many=True, required=False)
    main_artists = serializers.StringRelatedField(many=True, required=False)
    featured_artists = serializers.StringRelatedField(many=True, required=False)

    class Meta:
        model = models.Track
        fields = [
            "id",
            "title",
            "length",
            "bpm",
            "genres",
            "moods",
            "main_artists",
            "featured_artists",
            "audio",
            "cover_art",
            "waveform",
            "spotify",
        ]

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    print("Random string of length", length, "is:", result_str)

class PlaylistSerializer(serializers.ModelSerializer):
    track = TrackSerializer(many=True, required=False)

    class Meta:
        model = models.Playlist
        fields = ["id", "name", "track", ]

    def create(self, validated_data):
        tracks_data = validated_data.pop('track')
        album = models.Playlist.objects.create(**validated_data)
        for track_data in tracks_data:
            models.Track.objects.create(**track_data)
            models.PlaylistTrack.objects.create(id=get_random_string(10),
                                                track_id=list(track_data.values())[0],
                                                playlist_id=validated_data['id'])
        return album

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('track')
        # Unless the application properly enforces that this field is
        # always set, the following could raise a `DoesNotExist`, which
        # would need to be handled.
        profile = instance.track

        instance.save()
        profile.save()

        return instance