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

