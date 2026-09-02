# Client review — Vercel Comments

Pinned feedback on the live preview via [Vercel Comments](https://vercel.com/docs/comments) (toolbar on the page). Separate from the Loom walkthrough (`?review=1`).

## Why this

- Feedback sits on the exact UI element
- Threads + email notifications
- No PDF markups or “page 3, second paragraph” guesswork

## Your setup checklist

1. **Preview branch** — e.g. `client-review`. Push so Vercel builds a Preview URL.
2. **Toolbar / Comments** — Project → Settings → General → **Vercel Toolbar** → Preview = **On** (default).
3. **Invite reviewers** — Project → Settings → **Deployment Protection** / team members → invite each client email. They need a free Vercel account to comment. On Pro, invite as external collaborators who can view + comment.
4. **Share the Preview URL** (not production, unless you set `FAIRVIEW_CLIENT_REVIEW=1` on Production and want comments there).
5. **Optional:** Deployment Protection share link / password if the preview shouldn’t be public.
6. Send the email in `docs/client-review-email.md` with the real Preview URL filled in.

## How you’ll work comments

- Dashboard notification bell → Comments, or open the preview and use the toolbar **Inbox**
- Reply in-thread; resolve when done
- Session info on each comment helps reproduce browser quirks

## Env

| Var | Where | Purpose |
|---|---|---|
| `FAIRVIEW_CLIENT_REVIEW=1` | Vercel Production (optional) | Force toolbar/comments on production during review only — turn off after |

## Not the same as `?review=1`

| | Vercel Comments | `?review=1` |
|---|---|---|
| Who | Client + you | You / internal Loom tour |
| What | Sticky notes on the UI | Scripted walkthrough markers + video |
| URL | Preview deployment | Any URL + `?review=1` |

You can send both: Comments for their notes; `?review=1` only if you want them to hear the guided tour.
