-- Enable RLS on all tables
alter table public.recipes             enable row level security;
alter table public.ingredients         enable row level security;
alter table public.traditions          enable row level security;
alter table public.howto_articles      enable row level security;
alter table public.blog_posts          enable row level security;
alter table public.contact_submissions enable row level security;

-- PUBLIC: read published rows on content tables
create policy "Public can read published recipes"
  on public.recipes for select
  using (published = true);

create policy "Public can read published ingredients"
  on public.ingredients for select
  using (published = true);

create policy "Public can read published traditions"
  on public.traditions for select
  using (published = true);

create policy "Public can read published howto articles"
  on public.howto_articles for select
  using (published = true);

create policy "Public can read published blog posts"
  on public.blog_posts for select
  using (published = true);

-- PUBLIC: insert contact submissions (no auth needed)
create policy "Public can submit contact forms"
  on public.contact_submissions for insert
  with check (true);

-- AUTHENTICATED (admin): full access to all tables
create policy "Authenticated users have full access to recipes"
  on public.recipes for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users have full access to ingredients"
  on public.ingredients for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users have full access to traditions"
  on public.traditions for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users have full access to howto articles"
  on public.howto_articles for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users have full access to blog posts"
  on public.blog_posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can read all contact submissions"
  on public.contact_submissions for select
  using (auth.role() = 'authenticated');
