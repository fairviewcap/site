-- Fairview CMS schema
-- Apply in Supabase SQL editor, or: supabase db push

create extension if not exists "pgcrypto";

-- ── Team ────────────────────────────────────────────────────────────
create table if not exists public.team_members (
  id text primary key,
  name text not null,
  last_name text not null default '',
  slug text not null unique,
  role text not null default '',
  teaser text not null default '',
  bio_html text not null default '',
  bio_text text not null default '',
  image text not null default '',
  video_url text,
  email text,
  phone text,
  leadership boolean not null default false,
  board boolean not null default false,
  published boolean not null default false,
  draft boolean not null default true,
  since integer,
  show_on_rail boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_sort_idx
  on public.team_members (sort_order, last_name);

-- ── Learn ───────────────────────────────────────────────────────────
create table if not exists public.learn_channels (
  slug text primary key,
  label text not null,
  title text not null,
  dek text not null default '',
  summary text not null default '',
  tone text not null check (tone in ('ink', 'green', 'paper')),
  sort_order integer not null default 0
);

create table if not exists public.learn_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  channel text not null references public.learn_channels (slug) on delete restrict,
  title text not null,
  date date not null,
  excerpt text not null default '',
  body text[] not null default '{}',
  issue text,
  -- Optional hero / article photo URL; null when none
  image text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (channel, slug)
);

create index if not exists learn_articles_channel_date_idx
  on public.learn_articles (channel, date desc);

-- ── Straight Answers ────────────────────────────────────────────────
create table if not exists public.answer_categories (
  id text primary key,
  title text not null,
  dek text not null default '',
  sort_order integer not null default 0
);

create table if not exists public.answer_items (
  id uuid primary key default gen_random_uuid(),
  category_id text not null references public.answer_categories (id) on delete cascade,
  question text not null,
  slug text not null unique,
  answer text not null,
  more_href text,
  more_label text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists answer_items_category_sort_idx
  on public.answer_items (category_id, sort_order);

-- ── Contact + analytics ─────────────────────────────────────────────
create table if not exists public.contact_inquiries (
  id text primary key,
  name text not null,
  email text not null,
  phone text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists contact_inquiries_created_idx
  on public.contact_inquiries (created_at desc);

create table if not exists public.answer_intent_events (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('search', 'view')),
  query text not null default '',
  slug text,
  matches integer not null default 0,
  unmatched boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists answer_intent_created_idx
  on public.answer_intent_events (created_at desc);

-- ── Firm figures (optional CMS for AUM etc.) ────────────────────────
create table if not exists public.firm_figures (
  key text primary key,
  value text not null,
  label text not null,
  as_of date,
  note text,
  updated_at timestamptz not null default now()
);

-- ── updated_at trigger ──────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists team_members_updated_at on public.team_members;
create trigger team_members_updated_at
  before update on public.team_members
  for each row execute function public.set_updated_at();

drop trigger if exists learn_articles_updated_at on public.learn_articles;
create trigger learn_articles_updated_at
  before update on public.learn_articles
  for each row execute function public.set_updated_at();

drop trigger if exists answer_items_updated_at on public.answer_items;
create trigger answer_items_updated_at
  before update on public.answer_items
  for each row execute function public.set_updated_at();

-- ── RLS ─────────────────────────────────────────────────────────────
alter table public.team_members enable row level security;
alter table public.learn_channels enable row level security;
alter table public.learn_articles enable row level security;
alter table public.answer_categories enable row level security;
alter table public.answer_items enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.answer_intent_events enable row level security;
alter table public.firm_figures enable row level security;

-- Public read of published content (anon key)
drop policy if exists team_public_read on public.team_members;
create policy team_public_read on public.team_members
  for select to anon, authenticated
  using (published = true and draft = false);

drop policy if exists learn_channels_public_read on public.learn_channels;
create policy learn_channels_public_read on public.learn_channels
  for select to anon, authenticated
  using (true);

drop policy if exists learn_articles_public_read on public.learn_articles;
create policy learn_articles_public_read on public.learn_articles
  for select to anon, authenticated
  using (published = true);

drop policy if exists answer_categories_public_read on public.answer_categories;
create policy answer_categories_public_read on public.answer_categories
  for select to anon, authenticated
  using (true);

drop policy if exists answer_items_public_read on public.answer_items;
create policy answer_items_public_read on public.answer_items
  for select to anon, authenticated
  using (published = true);

drop policy if exists firm_figures_public_read on public.firm_figures;
create policy firm_figures_public_read on public.firm_figures
  for select to anon, authenticated
  using (true);

-- Anyone can submit a contact form / intent event (insert only)
drop policy if exists contact_insert on public.contact_inquiries;
create policy contact_insert on public.contact_inquiries
  for insert to anon, authenticated
  with check (true);

drop policy if exists intent_insert on public.answer_intent_events;
create policy intent_insert on public.answer_intent_events
  for insert to anon, authenticated
  with check (true);

-- Service role bypasses RLS for admin writes.

-- ── Storage buckets (run after project exists) ──────────────────────
-- insert into storage.buckets (id, name, public) values
--   ('team', 'team', true),
--   ('learn', 'learn', true)
-- on conflict (id) do nothing;
