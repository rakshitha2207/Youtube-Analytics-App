create table "public"."yt_videos" (
    "id" text not null,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone default now(),
    "url" text,
    "title" text,
    "likes" bigint,
    "views" bigint,
    "data_posted" date,
    "description" text,
    "num_comments" bigint,
    "preview_image" text,
    "youtuber_id" text,
    "transcript" text,
    "ai_summary" text,
    "ai_topics" text[]
);


alter table "public"."scrape_jobs" add column "dataset_id" text;

CREATE UNIQUE INDEX yt_videos_pkey ON public.yt_videos USING btree (id);

alter table "public"."yt_videos" add constraint "yt_videos_pkey" PRIMARY KEY using index "yt_videos_pkey";

alter table "public"."yt_videos" add constraint "yt_videos_youtuber_id_fkey" FOREIGN KEY (youtuber_id) REFERENCES yt_channels(id) not valid;

alter table "public"."yt_videos" validate constraint "yt_videos_youtuber_id_fkey";

grant delete on table "public"."yt_videos" to "anon";

grant insert on table "public"."yt_videos" to "anon";

grant references on table "public"."yt_videos" to "anon";

grant select on table "public"."yt_videos" to "anon";

grant trigger on table "public"."yt_videos" to "anon";

grant truncate on table "public"."yt_videos" to "anon";

grant update on table "public"."yt_videos" to "anon";

grant delete on table "public"."yt_videos" to "authenticated";

grant insert on table "public"."yt_videos" to "authenticated";

grant references on table "public"."yt_videos" to "authenticated";

grant select on table "public"."yt_videos" to "authenticated";

grant trigger on table "public"."yt_videos" to "authenticated";

grant truncate on table "public"."yt_videos" to "authenticated";

grant update on table "public"."yt_videos" to "authenticated";

grant delete on table "public"."yt_videos" to "service_role";

grant insert on table "public"."yt_videos" to "service_role";

grant references on table "public"."yt_videos" to "service_role";

grant select on table "public"."yt_videos" to "service_role";

grant trigger on table "public"."yt_videos" to "service_role";

grant truncate on table "public"."yt_videos" to "service_role";

grant update on table "public"."yt_videos" to "service_role";

CREATE TRIGGER "TriggerAIAnalysis" AFTER INSERT ON public.yt_videos FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('https://cpdmulfbanwccxxalkqp.supabase.co/functions/v1/ai_video_analysis', 'POST', '{"Content-type":"application/json"}', '{}', '5000');


