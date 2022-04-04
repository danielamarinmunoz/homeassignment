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
        try:
            tracks_id = []
            for dance in self.initial_data['track']:
                if 'id' not in dance:
                    raise serializers.ValidationError({'track': 'key error'})
                tracks_id.append(dance['id'])

            newPlaylist = models.Playlist.objects.create(**validated_data)
            if tracks_id:
                for track_id in tracks_id:
                    newPlaylist.track.add(track_id)
            newPlaylist.save()
            return newPlaylist
        except Exception as e:
            raise serializers.ValidationError({'detail': e})

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('track')
        # Unless the application properly enforces that this field is
        # always set, the following could raise a `DoesNotExist`, which
        # would need to be handled.
        profile = instance.track

        instance.save()
        profile.save()

        return instance