# Adding a new edition

An *edition* is one occasion in one year — Valentine's 2027, her birthday
2028, and so on. Nothing is ever replaced. Every edition you add stays on the
shelf forever.

| Occasion | Date |
|---|---|
| Girlfriend Day | 1 August |
| Our Anniversary | 13 April |
| Valentine's Day | 14 February |
| Her Birthday | 22 December |

---

## The whole thing, in one place

**Double-click `Edit Website.bat`.**

A black window opens and stays open, and your browser opens **Aurora Studio**.
That is the editor. Everything below happens there.

When you're finished, close the black window.

> The black window is a small program running on your own computer. It is what
> lets the editor save files and upload to GitHub — a normal web page is not
> allowed to do either. Nobody else can reach it.

---

## Making a new edition

1. Press **New** on the left.
2. Choose the occasion and the year. The date fills itself in.
3. Work through the tabs across the top:

**The basics** — the loading line, the small line above the title, the big
title, the line underneath, and the button. Pick the music here too, or add a
new file with *Add a music file…*

**Memories** — drag your photos in, in the order you want them. Each one gets
a title and a story. The photos are copied into this edition's folder for you,
and their sizes are read automatically so the page never jumps as they load.
Use ↑ and ↓ to reorder, ✕ to remove.

**Night sky** — tick the box and pick a date, time and place. It tells you how
many stars were above you and **warns you if the sun was still up** at that
time. Then add memory stars: each one pins a memory to a real star, chosen from
a list of only the stars that were actually in the sky that night.

**Letter** — the letter she reads. Leave it empty to skip the envelope scene.

**Ending** — the words that appear one after another, the closing message, and
the sign-off.

4. Press **Save**. That writes the edition and adds it to the website.
5. Press **Publish**. It shows you what changed, you type a short note, and it
   commits and uploads to GitHub.

That's it. No files to move, no lines to paste, no code.

---

## When does it go live?

**On its date, by itself.**

The site always shows the most recent edition whose date has passed. So you can
finish the birthday edition in October and publish it — she'll still see the
previous occasion until 22 December, when the birthday one takes over on its
own.

The **Preview** button in the editor lets you see it early. A small banner
appears at the bottom so you never mistake a preview for the live page.

To see everything so far, open the website and add `?archive` to the address.
A link to it also appears at the end of the story once there is more than one
edition.

---

## Adding photos and music later

You don't have to have everything ready. Make the edition now with just the
words, save it, and come back closer to the day to drag the photos in.

An edition with no memories simply skips that part of the story rather than
showing an empty space. Same for the letter and the constellation.

Music is the same — the page is just silent until you add a file. Keep music
under about 2.5 MB and make sure it loops without an obvious seam.

---

## Fixing something later

Open the studio, click the edition on the left, change whatever you like, press
Save, then Publish. Every piece of text on the site is a field in there.

---

## If something looks wrong

Open **check.html** (there's a *Run checks* button in the studio). It reads
everything and tells you in plain English about any missing photo, missing
music file, bad date, or star that wasn't in the sky that night.

**If the studio won't start**, the black window will say why. Almost always it
is that Node.js isn't installed — get it from nodejs.org, install it, and
double-click `Edit Website.bat` again.

**If the studio says an edition "needs fixing"**, that file has a typo in its
code part. Open it in VS Code: the first line must be `` addEdition(` `` and
the last line must be `` `); ``. Everything between them is ordinary text.

---

## Editing files by hand (you don't have to)

The studio is the easy way, but the edition files are deliberately readable, so
you can edit one in VS Code if you prefer:

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

A blank line starts a new paragraph. `editions/_template.js` is a blank one
with every option explained.

If you do edit by hand, don't delete the first line or the last line — those
two are the only actual code in the file.
