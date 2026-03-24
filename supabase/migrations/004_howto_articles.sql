create table if not exists public.howto_articles (
  id         uuid primary key default uuid_generate_v4(),
  title      text not null,
  slug       text not null unique,
  category   text,
  body       text,
  tags       text[] not null default '{}',
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger howto_articles_updated_at
  before update on public.howto_articles
  for each row execute procedure public.set_updated_at();

create index if not exists howto_articles_slug_idx on public.howto_articles (slug);
