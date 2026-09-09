# Aurora For My Pori ❤️

A private, cinematic interactive story made for Umme Arefin Akhand Momo —
"My Pori".

Plain HTML, CSS and JavaScript. No React, no npm, no build step. You can open
it with VS Code's Live Server and it just runs.

---

## Running it on your computer

1. Open the project folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. If a change doesn't show up, hard-refresh with **Ctrl+Shift+R**. CSS is
   cached aggressively and a normal refresh often shows the old version.

---

## Adding a new occasion each year

Every occasion in every year is one file in `editions/`. Nothing is ever
replaced — the site keeps all of them, and shows the most recent one whose
date has passed. So next year's file can sit there finished for months and
take over by itself on the day.

**Read [ADDING-A-NEW-EDITION.md](ADDING-A-NEW-EDITION.md).** The short
version: open `builder.html` with Live Server, fill it in, drag the photos on,
press Download — then open `check.html` to confirm it is all correct.

The four occasions are Girlfriend Day (1 August), Our Anniversary (13 April),
Valentine's Day (14 February) and her Birthday (22 December). Each has its
own theme, fonts and music.

Useful addresses:

- `index.html?archive` — the shelf of every edition so far
- `index.html?preview=2027-valentines` — look at one before its date

---

## Project structure

```
index.html               the shell - renders whichever edition is current
builder.html             fill in a form, get a new edition file
check.html               tells you in plain English if anything is wrong
ADDING-A-NEW-EDITION.md  how to add next year's

editions/
  _template.js           copy this to start a new edition
  2026-girlfriend-day.js

themes/                  one per occasion: fonts, colours, mood
  girlfriend-day.css   anniversary.css   valentines.css   birthday.css

css/style.css            the shared styling
js/
  edition-format.js      reads the edition files
  edition-select.js      picks the current one, applies its theme
  star-catalog.js        152 bright stars, with the constellation shapes
  sky.js                 works out the real sky for any date and place
  constellation.js       draws it, plus the clickable memory stars
  letter.js  stars.js  finale.js  main.js  archive.js  tom.js

assets/
  editions/2026-girlfriend-day/    photos, one folder per edition
  music/    icons/    images/tom/
```

Script order in `index.html` matters: `edition-format.js` first, then the
edition files, then `edition-select.js`, then everything else.

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
the theme starts when the hero button is pressed. That's deliberate.

**Never put a backtick (`` ` ``) in an edition file's text.** That character
is what marks where the text begins and ends, so one of them will break the
whole file. It is the only character that matters. The builder warns you if
you type one.

**The stylesheet has duplicate selectors.** It grew over time, and several
selectors (`#hero`, `.overlay`, `.memory`, `.memory img`, `button`) are
defined more than once. When two rules set the same property, the later one
usually wins. If a change seems to do nothing, search the file for the
selector — there is probably another copy further down overriding you.

**Specificity beats position.** An ID rule like `#endingName` beats a plain
`h1` rule no matter where it sits. This is why the mobile font sizes for
`#endingName` had to be written with `#endingName` and not `h1`.

**Photo sizes live in the edition file.** Each memory has `width:` and
`height:` matching the real pixel size of its photo, so the browser reserves
the right space while lazy-loading and nothing jumps. The builder fills these
in automatically. If you swap a photo by hand for one of a different size,
update those two numbers too.

**Photos are large.** The 11 photos in the first edition total about 7 MB.
They load lazily, so only what she scrolls to is downloaded. If you want it
faster on mobile data, resizing them to roughly 1200px on the long edge would
cut the total a lot with no visible difference at the size they're shown.

**Themes are scoped.** Every rule in `themes/*.css` starts with
`[data-occasion="..."]`, so a theme file is completely inert unless that
occasion is showing. That is what lets all four load at once safely.

---

Made with love by Dhrubo, for his Momo.
