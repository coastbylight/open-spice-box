create table if not exists public.traditions (
  id                    uuid primary key default uuid_generate_v4(),
  name                  text not null,
  slug                  text not null unique,
  region                text,
  philosophy            text,
  food_principles       text,
  common_ingredients    text[] not null default '{}',
  cooking_techniques    text[] not null default '{}',
  representative_dishes text[] not null default '{}',
  published             boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create trigger traditions_updated_at
  before update on public.traditions
  for each row execute procedure public.set_updated_at();

create index if not exists traditions_slug_idx on public.traditions (slug);
