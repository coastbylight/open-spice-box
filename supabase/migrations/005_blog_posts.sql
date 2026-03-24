create table if not exists public.blog_posts (
  id         uuid primary key default uuid_generate_v4(),
  title      text not null,
  slug       text not null unique,
  body       text,
  tags       text[] not null default '{}',
  published  boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute procedure public.set_updated_at();

create index if not exists blog_posts_slug_idx on public.blog_posts (slug);
create index if not exists blog_posts_created_at_idx on public.blog_posts (created_at desc);
