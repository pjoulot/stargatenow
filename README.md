# STARGATENOW

A single-page static site for the fan campaign to reverse the cancellation of
Martin Gero's greenlit *Stargate* revival.

## Structure

| File             | Purpose                                                            |
|------------------|-------------------------------------------------------------------|
| `index.html`         | The entire page (markup + inline CSS + small build scripts).  |
| `data.js`            | Editable content: actions, tweet, email, event, socials.      |
| `images/martin-gero.jpg`    | Briefing portrait.                                     |
| `images/gate.png`           | White Destiny-gate line art (transparent) behind the card. |
| `images/og-image.png`       | 1200×630 social share card (Open Graph / Twitter).     |
| `images/favicon.svg`        | Stargate-glyph favicon.                                |
| `images/apple-touch-icon.png`| 180×180 iOS home-screen icon.                         |
| `robots.txt` / `sitemap.xml` | SEO crawler files.                                    |

There is **no backend and no build step** — it's plain HTML/CSS/JS. The nav,
hero, countdown action card, briefing, and the "Eight ways to apply pressure"
list are all driven from `data.js`.

## Editing content

Everything editable lives in `data.js`:

- `site` — canonical URL, used by the "Copy link" action.
- `tweet` — the pre-filled X post (powers the hero "Join the Tweetstorm on X"
  button **and** the Action 01 "Post now" button). Keep it under ~270 chars.
- `email` — `subject` + `body` for the pre-filled "Respectful Emails" mailto links.
- `actions` — the 8 mobilization steps. Each maps to an icon in `index.html` by
  order, and has a `type` that controls its behaviour:
  - `tweet` — opens the X intent built from `tweet`.
  - `link` — single external link (`href`); e.g. "Watch on Prime".
  - `copy` — copies `site` to the clipboard.
  - `reveal` — expands an inline panel of `items`. Each item is a
    `link` (label/sub/href), a `mail` (label + email in `sub`, pre-filled from
    `email`), or an `address` (label + `lines`, with a copy button).
- `socials` — footer social icons/links (currently X only).

The tweetstorm date/time lives in `data.js` → `event` (`start` is ISO 8601 with
an explicit offset; it drives both the hero countdown and the "Add to Calendar"
`.ics`). **If you change the event date, also update it in two other places:**
the `Event` JSON-LD block in `index.html`'s `<head>`, and `<lastmod>` in
`sitemap.xml`.

## SEO & accessibility notes

- `<head>` includes title, description, canonical, Open Graph + Twitter card
  (image: `images/og-image.png`), `theme-color`, and `Organization` + `Event` JSON-LD.
- All inline SVG icons are `aria-hidden` (every control has visible text);
  decorative images use empty `alt`; keyboard focus is visible via
  `:focus-visible`; animations respect `prefers-reduced-motion`.
- Known trade-off: the top-nav links (`Briefing`, `Take Action`) are hidden
  below 860px (no hamburger) — the page is a single scroll, and the primary CTA
  stays visible. Add a mobile menu if the nav grows.

## Live #SaveStargate feed — deferred

The original design included a live tweet feed. It has been **removed for now**
because X/Twitter's free API no longer supports hashtag search and pulling live
posts requires a paid plan fetched server-side (incompatible with a pure static
host). To add it later, reintroduce the feed section and back it with either a
curated JSON file or a small serverless function.

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Upload these files to any static host — GitHub Pages, Netlify, Cloudflare
Pages, S3, or plain nginx. No configuration required.
