-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

create table if not exists public.recipes (
  id                        uuid primary key default uuid_generate_v4(),
  title                     text not null,
  slug                      text not null unique,
  subtitle                  text,
  cultural_origin           text,
  tradition                 text,
  headnote                  text,
  yield                     text,
  prep_time                 text,
  cook_time                 text,
  total_time                text,
  difficulty                text check (difficulty in ('Easy', 'Medium', 'Involved')),
  ingredients               jsonb not null default '[]'::jsonb,
  instructions              jsonb not null default '[]'::jsonb,
  key_ingredient_benefits   text,
  why_this_works            text,
  substitutions             text,
  serving_suggestions       text,
  storage_reheating         text,
  cultural_notes            text,
  source_name               text,
  source_url                text,
  source_author             text,
  tags                      text[] not null default '{}',
  hero_image_url            text,
  seo_title                 text,
  meta_description          text,
  published                 boolean not null default false,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger recipes_updated_at
  before update on public.recipes
  for each row execute procedure public.set_updated_at();

-- Index for slug lookups and list queries
create index if not exists recipes_slug_idx on public.recipes (slug);
create index if not exists recipes_published_idx on public.recipes (published);
create index if not exists recipes_tags_idx on public.recipes using gin (tags);
