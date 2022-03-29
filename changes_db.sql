-- Table: public.api_playlist

DROP TABLE IF EXISTS public.api_playlist;

CREATE TABLE IF NOT EXISTS public.api_playlist
(
    id character varying(10) COLLATE pg_catalog."default" NOT NULL,
	name character varying(200) COLLATE pg_catalog."default" NOT NULL,
	CONSTRAINT api_playlist_pkey PRIMARY KEY (id)

)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.api_playlist
    OWNER to "user";

DROP TABLE IF EXISTS public.api_playlist_track;

CREATE TABLE IF NOT EXISTS public.api_playlist_track
(
    id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    track_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    playlist_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT api_playlist_track_pk PRIMARY KEY (id),
    CONSTRAINT fk_api_playlist_track_api_track_track_id FOREIGN KEY (track_id)
        REFERENCES public.api_track (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED,
    CONSTRAINT fk_api_playlist_track_api_playlist_playlist_id FOREIGN KEY (playlist_id)
        REFERENCES public.api_playlist (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        DEFERRABLE INITIALLY DEFERRED
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.api_playlist_track
    OWNER to "user";