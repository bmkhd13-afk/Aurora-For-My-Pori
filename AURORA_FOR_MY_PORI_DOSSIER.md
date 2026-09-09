# Aurora For My Pori — Project Handoff Dossier

## 1. Project identity

Project name: Aurora For My Pori

Purpose: A private, cinematic Girlfriend Day interactive website made as a personal gift for Momo (Umme Arefin Akhand Momo), called “My Pori”.

Creative direction: approximately 70% Makoto Shinkai-inspired atmosphere + 30% Apple-inspired premium/minimal UI.

Core visual language:
- Night sky / aurora
- Bold black, red, and blue accents
- Stars, glowing particles, cinematic gradients
- Premium glassmorphism and restrained Apple-like UI
- Romantic, playful, cinematic storytelling
- Mobile-first because the recipient may open it on a phone

Important personal motifs:
- Aurora / night sky
- Katana
- Tangerines
- Mermaid
- Tom the lizard
- “My Pori ❤️”

Anniversary: 13 April.

The user has about 10+ photos; the current memory list contains 11 photo entries.

Final planned line:
“In every universe, I’d still find you.”

Finale concept:
Stars spell “Umme Arefin Akhand Momo”, then transform into “❤️ My Pori ❤️”.

---

## 2. How the project was originally built

The user is a beginner at web development and built the project step-by-step with ChatGPT.

Initial tools installed:
1. VS Code
2. GitHub Desktop
3. Live Server extension in VS Code

Initial project folder:
Aurora For My Pori/

Initial structure:
- index.html
- css/style.css
- js/main.js
- assets/images/
- assets/music/
- assets/icons/
- pages/

Later JavaScript files were added:
- js/memories.js
- js/constellation.js
- js/letter.js
- js/finale.js
- js/stars.js
- js/tom.js

The project is plain HTML/CSS/JavaScript. It does not use React, Vue, a bundler, npm, or a framework.

---

## 3. Current intended architecture / story flow

The locked story roadmap agreed with the user is:

Scene 0 — Loading
Scene 1 — Aurora Intro
Scene 2 — The Beginning / Memories
Scene 3 — Our Constellation
Scene 4 — Gallery / memory experience (the current implementation uses the memory timeline rather than a separate traditional gallery)
Scene 5 — Tom
Scene 6 — Hidden Gifts
Scene 7 — Mermaid World
Scene 8 — Letter
Scene 9 — Aurora Finale

However, some roadmap items were proposed but NOT yet implemented in the actual code:
- Hidden Gifts
- Mermaid World
- A fully upgraded Tom scene
- A fully cinematic constellation that spells the final name
- Some final scene transitions / polish

Do not assume those are already implemented. Inspect the real files before changing anything.

The user explicitly does NOT want another architecture redesign or a restart. Continue from the existing codebase.

---

## 4. Current file responsibilities

### index.html
Contains:
- Google Fonts
- Loader
- Global progress bar
- Global sky container
- Hero
- Memory container / Chapter 1
- Constellation
- Letter
- Finale
- Script includes

Important IDs currently used:
- loader
- website
- progressBar
- hero
- particles / globalParticles depending on latest state
- stars / globalStars depending on latest state
- beginBtn
- chapter1
- memoryContainer
- constellation
- sky
- memoryPopup
- popupTitle
- popupText
- letter
- envelope
- seal
- paper
- letterText
- continueFinale
- finale
- finalStars
- starCanvas
- endingContent
- endingName
- endingMessage
- bgMusic
- tom

### css/style.css
Contains all styling in one file.

Important note:
The stylesheet grew incrementally and contains duplicate selectors and overlapping definitions, especially:
- #hero
- .overlay
- .memory
- .memory img
- .memoryText
- button

This is technical debt. Do NOT casually rewrite the entire stylesheet while adding features. A cleanup pass can happen later, but the current appearance should be preserved.

### js/main.js
Responsible for:
- loader
- hero stars
- Begin Our Journey click
- memory engine rendering
- memory intersection observer
- particles
- progress bar
- possibly hero reveal logic
- background music start

Important: inspect the actual current file before editing because it has been patched multiple times.

NOTE (Sept 2026): this file no longer exists. Memory content lives in the
edition files now - see section 13.

### js/memories.js
Contains the memory data array used by main.js to generate the memory scenes.

### js/constellation.js
Current constellation system has a small number of clickable stars and connecting lines.

### js/letter.js
Responsible for:
- envelope interaction
- envelope opening
- paper reveal
- typewriter letter
- “Continue to the Sky ✨” button
- letter particle/star effect
- music fade if still present

### js/finale.js
Responsible for:
- finale IntersectionObserver
- animated name sequence:
  Umme
  Umme Arefin
  Umme Arefin Akhand
  Umme Arefin Akhand Momo
  ❤️ My Pori ❤️
- final personal message
- replay button

Important: inspect the actual current file before changing it.

### js/stars.js
Canvas-based finale starfield. A variable naming conflict occurred previously because main.js already used `const stars`; this was fixed by renaming the stars.js array to `finalStars`.

### js/tom.js
Current early version was simple:
- appends Tom image to body
- Tom moves across screen
- clicking Tom shows an alert with a random message

This is intentionally NOT the final Tom behavior yet. Planned upgrade:
- speech bubble above Tom
- no browser alerts
- random positioning
- different dialogue
- subtle idle animation
- Tom as a small Easter egg / post-credit companion

---

## 5. The 11 real memories

These are the user's real stories and should be preserved. Do not invent replacement facts.

Photo 1 — Beginning
“Our first ever meetup (ehm ehm date). We took this photo in the photobooth and had THE BEST EVER FIRST DATE conversation at Aarong er Shiri.”

Photo 2
“Our first ‘Official’ date. Even though 3rd date. But when you came in that Blue Sharee, I almost fainted (deep inside).”

Photo 3
“Our date at Northend Tejgaon, where the barista told us to maintain ‘SOCIAL DISTANCING??’ (they jealous of how good we look together baby).”

Photo 4
“Remember how I mistakenly poured my dish onto our dresses? Clumsy me. But THE CLASSIC ELEGANT POWER COUPLE pic was born that day :P”

Photo 5
“Our first Eid outing at Sonargaon Hotel. You looked like a heavensent Angel (Emnei Pori Daaki, yet I get mesmerized every time I see you).”

Photo 6
“The day where we gifted each other Polo Tshirts <3 <3 ;)”

Photo 7
“Our most CHATPATE date yet at Madchef DMD <3”

Photo 8
“The day where I literally crossed hundreds of miles to reach you from the end of the country.”

Photo 9
“We literally were starved to meet each other. So finally came directly to meet you, sat at White Canary Cafe, had some laughs and after dropping you to AUST, I went back to office. Worth every moment.”

Photo 10
“The day where we gifted each other some very special gifts <3 <3 <3 ;)”

Photo 11 — ending special
“Our date at the Intercontinental. Look how happy we're together. Cute na? It's my blessing to be with you, Pori <3”

Current memory titles/text in memories.js were created in a cinematic tone, but the user's facts above are the source of truth.

---

## 6. Confirmed features / behaviors

Implemented at various points:
- Loader
- Hero with aurora ribbons
- Animated hero stars
- Floating particles
- Cinematic hero text reveal
- “Take My Hand” hero button (previously “Begin Our Journey”)
- Smooth scroll from hero into memories
- Background music
- Dynamic memory generation from memories.js
- Alternating left/right memory layout
- Memory scroll reveal
- Scene dividers
- Progress bar
- Constellation clickable stars
- Constellation connecting lines
- Constellation secret message
- Animated letter envelope
- Letter typewriter effect
- “Continue to the Sky ✨”
- Finale name sequence
- Finale message
- Replay button
- Finale canvas stars
- Basic Tom

---

## 7. Important bugs already encountered and fixed

### Bug: hero content disappeared
Cause: conflicting animation declarations on .overlay. This was fixed by keeping one intro animation with forwards/delay.

### Bug: infinite loading
Cause: JavaScript syntax/runtime errors.
One specific error was:
“Uncaught SyntaxError: Identifier 'stars' has already been declared”
Cause: main.js had `const stars` while stars.js also declared `const stars`.
Fixed by renaming the stars.js array to `finalStars`.

### Bug: music did not play
Console showed:
“Uncaught TypeError: Cannot set properties of null (setting 'volume')”
Cause: `bgMusic` element was missing / not found.
The user fixed the background music issue.

### Bug: duplicate Continue button
The button was being appended every time the typewriter finished.
Fix: only create it when `document.getElementById("continueFinale")` does not already exist.

### Bug: duplicate Replay button
Same issue as above.
Fix: only create it when `document.getElementById("replayButton")` does not already exist.

### Bug: global background sky
The project was changed toward a global fixed sky containing aurora, stars, and particles. The CSS originally used `z-index:-1`, which placed it behind the body background. The intended fix was to use a visible stacking layer and keep the website above it.
Because this area has been patched several times, inspect the current DOM and CSS instead of assuming the latest state.

### Favicon 404
A favicon request returned 404. A favicon was suggested but may or may not be present in the current repo. Inspect before changing.

---

## 8. Current known visual/product issues to inspect

The user most recently identified these:

1. Background sky should persist from immediately after loading all the way to the end:
   - aurora
   - stars
   - particles
   The user wants the whole story to live under one continuous sky.

2. Letter:
   - “Continue to the Sky ✨” must exist only once.
   - It should not multiply after repeated interactions.

3. Finale:
   - “Replay Our Story” must exist only once.
   - Finale stars previously appeared constrained to a small portion of the screen; canvas sizing/positioning needs verification.

4. Tom:
   - Do not use browser alerts.
   - Desired behavior: speech bubble directly above Tom, short mini dialogue animation, then bubble disappears.
   - Tom should relocate to different random positions after interactions / at idle moments.
   - Tom should feel like a small Easter egg, not dominate the story.

5. The user disliked a separate “falling stars” page at the bottom. The falling stars effect should be integrated into the personal finale / message rather than creating an unnecessary standalone page.

6. The hero’s old “Scroll to begin” hint was removed because the main CTA is now “✨ Take My Hand”.

7. Background music should begin from an intentional user interaction and should not rely on autoplay without interaction.

---

## 9. Creative direction that must NOT be changed

Do NOT:
- restart from scratch
- switch to React/Vue/another framework unless the user explicitly asks
- redesign the information architecture
- remove the personal memories
- replace the personal tone with generic romantic copy
- add unrelated features
- repeatedly propose a “better architecture”

The user explicitly wants to finish and publish the existing project.

---

## 10. Final desired experience

Opening:
- loader
- continuous aurora/night sky emerges
- dedication:
  “For the girl who turned ordinary nights into auroras...”
- “My Pori ❤️”
- “An Interactive Story for Umme Arefin Akhand Momo”
- main CTA:
  “✨ Take My Hand”

Then:
- memory experience
- constellation
- mermaid scene (still to be implemented unless the actual repo shows otherwise)
- letter
- cinematic finale
- Tom post-credit / Easter egg

Final emotional idea:
Stars form:
“Umme Arefin Akhand Momo”
then transform into:
“❤️ My Pori ❤️”

Final line:
“In every universe, I’d still find you.”

---

## 11. How Claude should work on this project

The owner is a beginner. Give exact file names and exact change locations. Avoid vague instructions.

Before changing anything:
1. Inspect the repository.
2. Identify the current actual state.
3. Run the site / inspect console if tools permit.
4. Preserve working behavior.
5. Make small, testable changes.
6. Do not silently rewrite unrelated files.
7. Explain exactly what changed and why.
8. Prefer fixing existing code over adding duplicate systems.
9. When a change affects multiple files, state all affected files first.
10. Keep the current roadmap and design direction locked.

For significant changes, make a backup/commit first.

---

## 12. Immediate next work

Do NOT jump straight into new feature creation.

First audit:
- current index.html
- current style.css
- current main.js
- memories.js
- constellation.js
- letter.js
- finale.js
- stars.js
- tom.js
- asset paths

Then test:
- loader -> hero
- hero -> memories
- memories -> constellation
- constellation -> letter
- letter -> finale
- finale -> end

Then fix the highest-impact polish issues in this order:
1. Global continuous sky
2. Finale canvas full-screen stars
3. Duplicate button protections
4. Letter/finale interaction polish
5. Tom speech-bubble behavior
6. Mobile responsiveness
7. Final visual/performance polish
8. Deployment readiness

Do not add major new architecture until these are stable.


---

## 13. The editions system (added September 2026)

The site is no longer one fixed story. It is a shell that renders whichever
**edition** is current, and every occasion in every year is one edition.

This was an explicit, considered request from the owner, not a suggested
redesign. Section 9's "do not redesign the information architecture" still
stands for anything unprompted.

### The four occasions

| Occasion | Date | Slug |
|---|---|---|
| Girlfriend Day | 1 August | `girlfriend-day` |
| Our Anniversary | 13 April | `anniversary` |
| Valentine's Day | 14 February | `valentines` |
| Her Birthday | 22 December | `birthday` |

### How it works

- One file per edition in `editions/`, named `<year>-<slug>.js`.
- Each is registered with one `<script>` line inside the `EDITIONS` block in
  `index.html`. That block is the single place editions are listed; both
  `check.html` and `builder.html` read `index.html` to discover them rather
  than keeping a second list.
- Inside an edition file the content is **plain text**, not code: `key: value`
  settings and `--- memory ---` / `--- letter ---` / `--- finale ---` /
  `--- star ---` blocks. Only the first line (`addEdition(\``) and last
  (`` `); ``) are code.
- Parsing never throws. Problems go into `EDITION_PROBLEMS` and are reported
  by `check.html` in plain English.
- `js/edition-select.js` picks the most recent edition whose date has passed,
  sets `data-occasion` and `data-edition` on `<html>`, and exposes `EDITION`.
- Themes live in `themes/*.css`, every rule scoped to `[data-occasion="..."]`,
  so all four load but only one applies.
- `?preview=<id>` shows a future edition with a banner. `?archive` shows the
  shelf of everything so far.

### Why `.js` and not `.json` or `.txt`

Those need `fetch()`, which is blocked when `index.html` is opened by
double-clicking. The site currently works that way and that was preserved
deliberately. `builder.html` and `check.html` do use `fetch`, but they are
tools opened through Live Server, so that is fine.

### The sky is computed in the browser now

`js/sky.js` works out the real sky for any date, time and place from
`js/star-catalog.js` (152 bright stars, 24 constellation figures). An edition
just declares `sky: 2027-04-13 21:00` and `sky-place: Dhaka`. Verified
identical to the previously pre-generated data for 13 April 2026 — same 96
stars, same 80 lines, zero positional difference.

Places are Dhaka, Shahjahanpur and Mohammadpur only. The owner was explicit:
always Dhaka. The two neighbourhoods are ~7km apart, which is astronomically
irrelevant, but the caption naming the real place matters.

`sunAltitude()` lets `check.html` warn when a chosen time was in daylight.

### Authoring, for a non-coder

- `builder.html` — a form. Reads photo dimensions automatically, previews the
  sky, warns about backticks, and downloads a ready edition file.
- `check.html` — validates everything and reports in plain English: missing
  photos, missing music, bad dates, stars that were below the horizon.
- `editions/_template.js` — a fully commented blank.
- `ADDING-A-NEW-EDITION.md` — the guide written for the owner.

### The one real fragility

A backtick in an edition file's text ends the template literal and breaks
that file. Everything else degrades gracefully. This is called out in the
template, the builder, the README and the guide.

### Things that were removed

- `js/memories.js` — content is edition data now.
- `js/skydata.js` and the whole `tools/` folder — the browser computes it.
- Photos moved from `assets/images/` to `assets/editions/<id>/`.

### Test suites (in the scratchpad, not the repo)

Browser tests driven by puppeteer-core against Brave: main regression (37),
Tom (26), sky (28), builder round-trip (16), multi-edition + archive (14).
They are not committed; the repo stays npm-free.

---

## 14. Aurora Studio and the premium pass (September 2026)

### The studio

The owner asked to never touch code again, and for edits to end up in git.
A page served over `file://` or Live Server can do neither, so there is a tiny
local server.

- `Edit Website.bat` — what the owner double-clicks. Checks for Node, then runs
  the server. Must keep CRLF line endings (pinned in `.gitattributes`) or the
  multi-line `if (` block breaks.
- `studio/server.js` — zero-dependency Node HTTP server on `127.0.0.1:4321`.
  Serves the site, and exposes a small API: list/save/delete editions, upload
  photos and music, `git status`, and commit+push. Every path from the browser
  goes through `safePath()` which resolves it and refuses anything outside the
  project folder.
- `studio/studio.{html,css,js}` — the editor. Reads edition files by running
  them through `new Function("addEdition", text)`, i.e. exactly how the browser
  reads them, so escapes behave identically.

Save writes the edition file **and** rewrites the `EDITIONS` block in
`index.html` between `<!-- EDITIONS:START -->` and `<!-- EDITIONS:END -->`.
Those two markers are the contract; the decorated comment around them is just
for humans and can be reworded.

### The backtick problem is solved

The studio escapes `` ` `` and `${` when writing. A template literal unescapes
them on load, so arbitrary text now round-trips. Verified end to end with a
title of ``My `Pori` ❤️ ${test}``.

Hand-edited files can still be broken by a stray backtick. The studio marks
such an edition "needs fixing" rather than failing silently.

### Robustness

Deliberately broken inputs are covered by `robusttest.js`:

- No editions at all → a placeholder EDITION so nothing dereferences null, and
  the loader stays up explaining itself.
- An edition with no memories / letter / stars → those sections are skipped
  rather than rendered empty. `sceneHasContent()` in `edition-select.js`.
- A missing photo → the broken image is hidden.
- One unreadable edition file → the others still work.

### The premium pass

`css/style.css` ends with a section marked **PREMIUM PASS**. Because the
stylesheet has long-standing duplicate selectors, the refined look is layered
there rather than by editing the older rules. Same specificity, later in the
file. This is the place to adjust the feel.

Notable: a fine SVG film grain on `body::after` is what stops the large flat
gradients reading as plastic. The memory layout is a two-column editorial grid
with a constrained measure. The hero is a title card. The button no longer
pulses.

### Two traps worth remembering

- **`[hidden]` loses to any author `display` rule.** `.modal{display:flex}`
  left the publish overlay invisible over the whole editor swallowing clicks.
  `studio.css` now has `[hidden]{display:none!important}`.
- **The finale trigger is `rootMargin`, not a threshold.** A ratio threshold
  silently stops working once a section is taller than the viewport. It is
  `-45% 0px -45% 0px` so the finale must reach the middle of the screen — at
  -25% it began while the letter was still being read.

### builder.html was removed

It and the studio did the same job differently. The studio supersedes it.

### Test suites (scratchpad, not committed)

main 37, Tom 26, sky 28, robustness 10, archive 14, studio 20. The studio suite
works on a throwaway git clone and asserts a real commit is made.
