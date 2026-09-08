# Aurora For My Pori ❤️

A private, cinematic interactive story made as a Girlfriend Day gift for
Umme Arefin Akhand Momo — "My Pori".

Plain HTML, CSS and JavaScript. No React, no npm, no build step. You can open
it with VS Code's Live Server and it just runs.

---

## Running it on your computer

1. Open the project folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. If a change doesn't show up, hard-refresh with **Ctrl+Shift+R**. CSS is
   cached aggressively and a normal refresh often shows the old version.

---

## Project structure

```
index.html            the whole page structure
css/style.css         all styling (one file)
js/memories.js        the 11 memories: photo, size, title, text
js/main.js            loader, hero, memory list, stars, particles, progress bar
js/constellation.js   the clickable constellation stars
js/letter.js          envelope, typewriter letter, "Continue to the Sky"
js/stars.js           the finale starfield canvas
js/finale.js          name sequence, ending message, replay, falling stars
js/tom.js             Tom the lizard easter egg
assets/images/        photo1.jpg … photo11.jpg, plus tom/tom.png
assets/music/theme.mp3
assets/icons/favicon.png
```

Script order in `index.html` matters. `stars.js` must load before `finale.js`,
and `memories.js` before `main.js`.

---

## Publishing it (GitHub Pages)

1. Push this folder to a GitHub repository.
2. On GitHub: **Settings → Pages**.
3. Under "Build and deployment", set Source to **Deploy from a branch**,
   branch **main**, folder **/ (root)**. Save.
4. Wait a minute, then reload the Settings → Pages screen. It shows your live
   address, something like:
   `https://yourname.github.io/aurora-for-my-pori/`

### One thing to do after your first deploy

Open `index.html` and find the three `YOUR-URL-HERE` placeholders near the top.
Replace them with your real address so the link preview looks right when you
send it in WhatsApp or Messenger. For example:

```html
<meta property="og:url" content="https://yourname.github.io/aurora-for-my-pori/">
<meta property="og:image" content="https://yourname.github.io/aurora-for-my-pori/assets/icons/favicon.png">
<meta name="twitter:image" content="https://yourname.github.io/aurora-for-my-pori/assets/icons/favicon.png">
```

Commit and push again. Everything else works without changes.

### Privacy

The page carries `<meta name="robots" content="noindex, nofollow">`, which
asks Google not to index it. Anyone with the link can still open it — it just
won't turn up in search results for her name. Delete that one line in
`index.html` if you ever want it findable.

Note that GitHub Pages sites are public to anyone who has the URL. If you want
it genuinely restricted, GitHub Pages is not the right host.

---

## Things worth knowing before you edit

**Music needs a click first.** Browsers block audio that plays on its own, so
the theme starts when "✨ Take My Hand" is pressed. That's deliberate.

**The stylesheet has duplicate selectors.** It grew over time, and several
selectors (`#hero`, `.overlay`, `.memory`, `.memory img`, `button`) are defined
more than once. When two rules set the same property, the later one usually
wins. If a change seems to do nothing, search the file for the selector — there
is probably another copy further down overriding you.

**Specificity beats position.** An ID rule like `#endingName` will beat a plain
`h1` rule no matter where it sits. This is why the mobile font sizes for
`#endingName` had to be written with `#endingName` and not `h1`.

**Photo sizes are recorded in `memories.js`.** Each memory has `w:` and `h:`
matching the real pixel size of its photo. These become `width`/`height`
attributes so the browser reserves the right space while lazy-loading. If you
swap a photo for one of a different size, update `w:` and `h:` too, or the
layout will shift as it loads.

**Photos are large.** The 11 photos total about 7 MB. They load lazily now, so
only what she scrolls to is downloaded. If you want it faster on mobile data,
resizing them to roughly 1200px on the long edge would cut the total a lot
without any visible difference at the size they're displayed.

---

Made with love by Dhrubo, for his Momo.
