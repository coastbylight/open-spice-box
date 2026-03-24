create table if not exists public.contact_submissions (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx on public.contact_submissions (created_at desc);
