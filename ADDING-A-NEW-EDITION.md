# Adding a new edition

An *edition* is one occasion in one year — Valentine's 2027, her birthday
2028, and so on. Nothing is ever replaced. Every edition you add stays on the
shelf forever.

There are four occasions:

| Occasion | Date | Name to use |
|---|---|---|
| Girlfriend Day | 1 August | `girlfriend-day` |
| Our Anniversary | 13 April | `anniversary` |
| Valentine's Day | 14 February | `valentines` |
| Her Birthday | 22 December | `birthday` |

---

## The short version

1. Open **`builder.html`** with Live Server.
2. Fill it in, drag the photos on, press **Download**.
3. Put the downloaded file in the `editions` folder.
4. Put the photos in the folder the builder names.
5. Add the one line it gives you to `index.html`.
6. Open **`check.html`** with Live Server to confirm it is all correct.

That's it. You never type any code.

---

## The longer version

### 1. Open the builder

Right-click `builder.html` in VS Code → **Open with Live Server**.

Pick the occasion and the year. The date fills itself in.

### 2. Write it

Fill in the title, the small line above it, the button, and so on. The
defaults are the ones from the first edition, so you can leave most of them.

For the **music**, type the path to the file, like
`assets/music/valentines.mp3`, and put that mp3 in `assets/music/`. Try to
keep music files under about 2.5 MB so the page stays quick on her phone.

### 3. Drag the photos in

Drag them all at once, in the order you want them to appear. The builder
reads each photo's size automatically, which is what stops the page from
jumping about as the photos load.

Give each one a title and its story. A blank line starts a new paragraph.

### 4. The night sky (optional)

Give it a date and a time and it will draw the sky exactly as it was — the
real stars, in their real positions, over Dhaka.

It tells you underneath how many stars were up. **If you pick a time before
sunset it will warn you** that the sun was still up, so it would be a
daylight sky. After about 7pm is safe.

Leave the date empty if this edition should not have a star map.

### 5. Download and file it

Press **Download**. Then:

- Move the downloaded file into the **`editions`** folder.
- Make the photo folder the builder names — something like
  `assets/editions/2027-valentines/` — and put the same photos in it,
  **with the same file names**.
- Open `index.html`, scroll to the block that says `EDITIONS`, and paste in
  the line the builder gives you. It looks like this:

```html
<script src="editions/2027-valentines.js"></script>
```

That is the only line you ever add to `index.html`.

### 6. Check it

Open `check.html` with Live Server. It reads everything and tells you, in
plain English, about any missing photo, missing music file, or star that
wasn't in the sky that night. If it says "Everything looks good", you're done.

---

## When does it go live?

**On its date, by itself.**

The site always shows the most recent edition whose date has passed. So you
can finish the birthday edition in October and commit it — she'll still see
the previous occasion until 22 December, when the birthday one takes over on
its own.

To look at one before its date, add `?preview=` and its name:

```
index.html?preview=2027-valentines
```

A small banner appears at the bottom so you never mistake a preview for the
live page.

To see the shelf of everything so far:

```
index.html?archive
```

A link to it also appears at the end of the story once there is more than
one edition.

---

## Editing by hand instead

If you just want to fix a typo, open the edition file in VS Code and edit the
text. It is ordinary writing, not code:

```
occasion: valentines
date: 2027-02-14
title: My Pori

--- memory ---
photo: photo1.jpg
title: The Café
We laughed for an hour.

Then it rained.
```

Two rules:

1. **Do not delete the first line (`addEdition(\``) or the last line
   (`` `); ``).** Those two are the only actual code in the file.
2. **Do not use the ` character** (backtick) anywhere in your writing — that
   is the character that marks where your text ends. Apostrophes, quotes,
   commas, emoji and Bangla are all completely fine.

`editions/_template.js` is a blank one with every option explained. Copy it if
you would rather start from scratch.

---

## If something goes wrong

**Open `check.html` first.** It is built to tell you what is wrong in plain
language.

If the page is completely blank, it is almost always rule 2 above — a
backtick somewhere in the text. Open the browser console (F12) and it will
say `Invalid or unexpected token` with the file name.

Everything else — a missing photo, a bad date, a star that wasn't up — is
handled gracefully. That one field is skipped, the rest of the site keeps
working, and `check.html` will tell you about it.
