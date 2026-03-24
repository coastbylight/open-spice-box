create table if not exists public.ingredients (
  id                                uuid primary key default uuid_generate_v4(),
  name                              text not null,
  slug                              text not null unique,
  alternative_names                 text[] not null default '{}',
  image_url                         text,
  overview                          text,
  flavor_profile                    text[] not null default '{}',
  cultural_history                  text,
  origin_regions                    text[] not null default '{}',
  traditional_medicine_perspectives jsonb not null default '{}'::jsonb,
  modern_scientific_research        text,
  culinary_uses                     text,
  preparation_methods               text,
  traditional_dishes                text[] not null default '{}',
  tags                              text[] not null default '{}',
  published                         boolean not null default false,
  created_at                        timestamptz not null default now(),
  updated_at                        timestamptz not null default now()
);

create trigger ingredients_updated_at
  before update on public.ingredients
  for each row execute procedure public.set_updated_at();

create index if not exists ingredients_slug_idx on public.ingredients (slug);
create index if not exists ingredients_published_idx on public.ingredients (published);
create index if not exists ingredients_tags_idx on public.ingredients using gin (tags);
