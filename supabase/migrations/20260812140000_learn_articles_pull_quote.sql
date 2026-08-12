-- Optional editorial pull quote for letter (and other) articles
alter table public.learn_articles
  add column if not exists pull_quote text;
