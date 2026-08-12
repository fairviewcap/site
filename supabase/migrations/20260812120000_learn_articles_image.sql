-- Optional photo for learn articles (some have images, some don't)
alter table public.learn_articles
  add column if not exists image text;
