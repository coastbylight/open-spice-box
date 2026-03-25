-- ═══════════════════════════════════════════════════════════════════════════════
-- 010_user_accounts.sql
-- User profiles, ratings, comments, collections, and flagging system
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── Profiles ────────────────────────────────────────────────────────────────

create table if not exists public.profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  display_name        text not null,
  avatar_url          text,
  bio                 text,
  cooking_skill       text check (cooking_skill in ('beginner', 'intermediate', 'advanced')),
  dietary_preferences text[] not null default '{}',
  cuisine_interests   text[] not null default '{}',
  favorite_ingredients text[] not null default '{}',
  role                text not null default 'user' check (role in ('user', 'verified_creator', 'admin')),
  public_collections  boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ─── Add created_by to recipes (future user-submitted recipes) ───────────────

alter table public.recipes
  add column if not exists created_by uuid references public.profiles(id) on delete set null;

alter table public.recipes
  add column if not exists average_rating numeric,
  add column if not exists rating_count integer not null default 0;

-- ─── Recipe Ratings ──────────────────────────────────────────────────────────

create table if not exists public.recipe_ratings (
  id         uuid primary key default gen_random_uuid(),
  recipe_id  uuid not null references public.recipes(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  rating     integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(recipe_id, user_id)
);

create trigger recipe_ratings_updated_at
  before update on public.recipe_ratings
  for each row execute procedure public.set_updated_at();

create index recipe_ratings_recipe_idx on public.recipe_ratings(recipe_id);
create index recipe_ratings_user_idx on public.recipe_ratings(user_id);

-- ─── Recipe Comments ─────────────────────────────────────────────────────────

create table if not exists public.recipe_comments (
  id         uuid primary key default gen_random_uuid(),
  recipe_id  uuid not null references public.recipes(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  parent_id  uuid references public.recipe_comments(id) on delete cascade,
  body       text not null,
  rating     integer check (rating is null or (rating >= 1 and rating <= 5)),
  flagged    boolean not null default false,
  flag_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger recipe_comments_updated_at
  before update on public.recipe_comments
  for each row execute procedure public.set_updated_at();

create index recipe_comments_recipe_idx on public.recipe_comments(recipe_id);
create index recipe_comments_user_idx on public.recipe_comments(user_id);
create index recipe_comments_parent_idx on public.recipe_comments(parent_id);

-- Enforce: rating only on top-level comments (parent_id is null)
alter table public.recipe_comments
  add constraint comments_rating_only_top_level
  check (parent_id is null or rating is null);

-- ─── User Collections ────────────────────────────────────────────────────────

create table if not exists public.user_collections (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  name       text not null,
  is_default boolean not null default false,
  is_public  boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger user_collections_updated_at
  before update on public.user_collections
  for each row execute procedure public.set_updated_at();

create index user_collections_user_idx on public.user_collections(user_id);

-- ─── Collection Recipes (join table) ─────────────────────────────────────────

create table if not exists public.collection_recipes (
  collection_id uuid not null references public.user_collections(id) on delete cascade,
  recipe_id     uuid not null references public.recipes(id) on delete cascade,
  added_at      timestamptz not null default now(),
  primary key (collection_id, recipe_id)
);

create index collection_recipes_recipe_idx on public.collection_recipes(recipe_id);

-- ─── Comment Flags ───────────────────────────────────────────────────────────

create table if not exists public.comment_flags (
  comment_id uuid not null references public.recipe_comments(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  reason     text,
  created_at timestamptz not null default now(),
  primary key (comment_id, user_id)
);

-- ─── Auto-create profile + default collection on signup ──────────────────────

create or replace function public.handle_new_user()
returns trigger as $$
declare
  new_display_name text;
begin
  -- Use the name from metadata if available, otherwise use email prefix
  new_display_name := coalesce(
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'name',
    split_part(new.email, '@', 1)
  );

  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    new_display_name,
    new.raw_user_meta_data->>'avatar_url'
  );

  -- Create default "Saved" collection
  insert into public.user_collections (user_id, name, is_default)
  values (new.id, 'Saved', true);

  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if it exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Update recipe rating aggregates ─────────────────────────────────────────

create or replace function public.update_recipe_rating_aggregates()
returns trigger as $$
declare
  target_recipe_id uuid;
begin
  -- Get the recipe_id from either the new or old row
  target_recipe_id := coalesce(new.recipe_id, old.recipe_id);

  -- Recalculate from both standalone ratings and comment ratings
  update public.recipes
  set
    average_rating = (
      select round(avg(r)::numeric, 1)
      from (
        select rating as r from public.recipe_ratings where recipe_id = target_recipe_id
        union all
        select rating as r from public.recipe_comments where recipe_id = target_recipe_id and rating is not null
      ) all_ratings
    ),
    rating_count = (
      select count(*)
      from (
        select id from public.recipe_ratings where recipe_id = target_recipe_id
        union all
        select id from public.recipe_comments where recipe_id = target_recipe_id and rating is not null
      ) all_ratings
    )
  where id = target_recipe_id;

  return coalesce(new, old);
end;
$$ language plpgsql security definer;

-- Triggers for rating aggregation from recipe_ratings
create trigger update_recipe_ratings_on_insert
  after insert on public.recipe_ratings
  for each row execute procedure public.update_recipe_rating_aggregates();

create trigger update_recipe_ratings_on_update
  after update on public.recipe_ratings
  for each row execute procedure public.update_recipe_rating_aggregates();

create trigger update_recipe_ratings_on_delete
  after delete on public.recipe_ratings
  for each row execute procedure public.update_recipe_rating_aggregates();

-- Triggers for rating aggregation from recipe_comments
create trigger update_comment_ratings_on_insert
  after insert on public.recipe_comments
  for each row execute procedure public.update_recipe_rating_aggregates();

create trigger update_comment_ratings_on_update
  after update on public.recipe_comments
  for each row execute procedure public.update_recipe_rating_aggregates();

create trigger update_comment_ratings_on_delete
  after delete on public.recipe_comments
  for each row execute procedure public.update_recipe_rating_aggregates();

-- ─── RLS Policies ────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;
alter table public.recipe_ratings enable row level security;
alter table public.recipe_comments enable row level security;
alter table public.user_collections enable row level security;
alter table public.collection_recipes enable row level security;
alter table public.comment_flags enable row level security;

-- Profiles: anyone can read, users can update their own
create policy "Anyone can read profiles"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Ratings: anyone can read, authenticated can manage their own
create policy "Anyone can read ratings"
  on public.recipe_ratings for select using (true);

create policy "Authenticated users can insert ratings"
  on public.recipe_ratings for insert with check (auth.uid() = user_id);

create policy "Users can update own ratings"
  on public.recipe_ratings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own ratings"
  on public.recipe_ratings for delete using (auth.uid() = user_id);

-- Comments: anyone can read, authenticated can manage their own
create policy "Anyone can read comments"
  on public.recipe_comments for select using (true);

create policy "Authenticated users can insert comments"
  on public.recipe_comments for insert with check (auth.uid() = user_id);

create policy "Users can update own comments"
  on public.recipe_comments for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can delete own comments"
  on public.recipe_comments for delete using (auth.uid() = user_id);

-- Admin can delete any comment
create policy "Admins can delete any comment"
  on public.recipe_comments for delete
  using (
    exists (
      select 1 from public.profiles where id = auth.uid() and role = 'admin'
    )
  );

-- Collections: users manage their own, public read when both toggles are true
create policy "Users can manage own collections"
  on public.user_collections for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Public can read public collections"
  on public.user_collections for select
  using (
    is_public = true
    and exists (
      select 1 from public.profiles where id = user_id and public_collections = true
    )
  );

-- Collection recipes: users manage via their collections
create policy "Users can manage own collection recipes"
  on public.collection_recipes for all
  using (
    exists (
      select 1 from public.user_collections where id = collection_id and user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.user_collections where id = collection_id and user_id = auth.uid()
    )
  );

create policy "Public can read public collection recipes"
  on public.collection_recipes for select
  using (
    exists (
      select 1 from public.user_collections uc
      join public.profiles p on p.id = uc.user_id
      where uc.id = collection_id
        and uc.is_public = true
        and p.public_collections = true
    )
  );

-- Comment flags: authenticated can create their own
create policy "Authenticated users can insert flags"
  on public.comment_flags for insert with check (auth.uid() = user_id);

create policy "Users can read own flags"
  on public.comment_flags for select using (auth.uid() = user_id);

-- Admin can read all flags
create policy "Admins can read all flags"
  on public.comment_flags for select
  using (
    exists (
      select 1 from public.profiles where id = auth.uid() and role = 'admin'
    )
  );
