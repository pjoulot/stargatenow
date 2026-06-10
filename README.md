# STARGATENOW

A single-page static site for the fan campaign to reverse the cancellation of
Martin Gero's greenlit *Stargate* revival.

## Structure

| File             | Purpose                                                            |
|------------------|-------------------------------------------------------------------|
| `index.html`     | The entire page (markup + inline CSS + small build scripts).      |
| `data.js`        | Editable content: the 8 action items and the footer social links. |
| `martin-gero.jpg`| Briefing portrait.                                                 |
| `gate.png`       | White Destiny-gate line art (transparent) behind the action card. |
| `favicon.svg`    | Stargate-glyph favicon.                                            |

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

The hero countdown target lives in the inline `/* countdown */` script in
`index.html` (currently a rolling offset; set it to a fixed date for a real
event).

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
