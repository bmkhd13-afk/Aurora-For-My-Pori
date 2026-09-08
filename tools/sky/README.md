# Sky generator

Regenerates `js/skydata.js` — the real sky over Dhaka at 5:30 PM on
13 April 2026.

**You never need to run this** unless you want a different date, time or
place. The website only reads the generated `js/skydata.js`, which is
committed. Nothing here runs in the browser.

## Running it

Needs Node.js. From the project root:

```
node tools/sky/generate.js .
```

It rewrites `js/skydata.js` and prints a summary you can sanity-check.

## Changing the moment

Open `tools/sky/generate.js` and edit the constants near the top:

```js
const LAT = 23.8103, LON = 90.4125, TZ = 6;   // Dhaka
const Y = 2026, M = 4, D = 13, HOUR_LOCAL = 17.5;   // 17.5 = 5:30 PM
```

`HOUR_LOCAL` is a 24-hour decimal: 17.5 is 5:30 PM, 21 is 9:00 PM.

Then re-run the command above. If you change the time, also update the
`when:` text that appears in the caption — the generator writes it from
these constants, so it stays correct automatically.

## A note on 5:30 PM

`node tools/sky/sun.js` shows that at 5:30 PM the Sun was still about 10
degrees above the horizon; sunset in Dhaka that day was 18:19. So these 96
stars were genuinely above the two of you, but daylight hid them. If you
would rather have the sky you could actually *see*, set `HOUR_LOCAL = 20`
or later and regenerate.

## Files

- `catalog.js` — 152 bright stars (J2000 coordinates) and the constellation
  stick figures.
- `generate.js` — precesses the coordinates to 2026, converts to
  altitude/azimuth for the given place and moment, projects to the map, and
  writes `js/skydata.js`.
- `sun.js` — the daylight check above.

## How the map works

Azimuthal equidistant projection: the zenith (straight up) is the centre,
the horizon is the circle at the edge, and distance from the centre is
proportional to angle down from vertical. North is at the top and **east is
on the left** — that looks backwards on a road map, but it is correct for a
map of the sky, which you hold above your head and look up through.
