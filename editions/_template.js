/* ---------------------------------------------------------------------------
   A NEW EDITION - copy this file to start one.

   1. Copy this file and rename it like  2027-valentines.js
      (the year, a dash, then one of: girlfriend-day, anniversary,
       valentines, birthday)

   2. Make a folder for the photos:
      assets/editions/2027-valentines/
      and put the photos in it.

   3. Fill in the lines below.

   4. Open index.html and add one line inside the EDITIONS block:
      <script src="editions/2027-valentines.js"></script>

   5. Open check.html in Live Server. It tells you in plain English if
      anything is wrong.

   Only the "addEdition(`" line at the top and the "`);" line at the very
   bottom are code. Do not delete those two. Everything between them is
   ordinary text.

   The one character to avoid in your text is the backtick ` because that is
   what marks the start and end. Apostrophes, quotes, commas, emoji and
   Bangla are all fine.
   --------------------------------------------------------------------------- */

addEdition(`

# ---------- the basics ----------
# Lines starting with # are notes to yourself and are ignored.

occasion: valentines
date: 2027-02-14

title: My Pori
dedication: A short line above the title.
subtitle: An Interactive Story for Umme Arefin Akhand Momo
button: Take My Hand
loader: Gathering our favorite memories...

music: assets/music/valentines.mp3


# ---------- the real sky, if you want one ----------
# The night sky exactly as it was, worked out for you.
# Place can be Dhaka, Shahjahanpur or Mohammadpur.
# Remember it needs to be dark - after about 7pm - or the sun was still up.
# Delete these two lines if this edition should not have a sky.

sky: 2027-02-14 21:00
sky-place: Dhaka


# ---------- which scenes to show ----------
# Leave this line out to show all of them.
# Choices: hero, memories, constellation, letter, finale

scenes: hero, memories, constellation, letter, finale


# ---------- the memories ----------
# Copy the whole block below for each photo. The photo name is just the
# file name - the folder is worked out from the edition name.
#
# width and height are the photo's real pixel size. They are optional, but
# without them the page jumps slightly as each photo loads. The builder page
# fills them in for you automatically.

--- memory ---
photo: photo1.jpg
title: The title of this memory
width: 2560
height: 1920
Write the story here.

Leave a blank line for a new paragraph.
A single line break stays a line break.

--- memory ---
photo: photo2.jpg
title: Another memory
Write the story here.


# ---------- the constellation ----------
# Each star pins a memory to a real star that was in the sky that night.
# The anchor must be a star that was actually up - check.html lists the ones
# available for your date and will tell you if you pick one that was not.
# Good bright ones: sirius, rigel, capella, regulus, pollux, betelgeuse,
# procyon, aldebaran, vega, arcturus, altair, deneb, antares, spica.

--- star ---
anchor: sirius
title: A moment
One line about it.

--- star ---
anchor: rigel
title: Another moment
One line about it.


# ---------- the letter ----------

--- letter ---
Write the letter here.

It is typed out one character at a time on the page.


# ---------- the ending ----------
# name: the words that appear one after another, separated by |
# signoff: the small line at the very end

--- finale ---
name: Umme | Umme Arefin | Umme Arefin Akhand | Umme Arefin Akhand Momo | My Pori
signoff: Made with love by Dhrubo for his Momo
The closing message.

A blank line makes a new paragraph.

`);
