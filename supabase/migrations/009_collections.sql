create table if not exists public.collections (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  slug            text not null unique,
  description     text,
  cover_image_url text,
  recipe_slugs    text[] not null default '{}',
  published       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger collections_updated_at
  before update on public.collections
  for each row execute procedure public.set_updated_at();

create index if not exists collections_slug_idx      on public.collections (slug);
create index if not exists collections_published_idx on public.collections (published);

-- RLS: public read for published collections
alter table public.collections enable row level security;

create policy "Public can read published collections"
  on public.collections for select
  using (published = true);

create policy "Authenticated users can manage collections"
  on public.collections for all
  to authenticated
  using (true)
  with check (true);
