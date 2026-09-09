/* ===========================================================================
   THE SHELF

   Every edition ever published, newest first, grouped by year. This is the
   heirloom part: nothing is ever replaced, only added to.

   Reached from the small link at the bottom of any edition, or directly at
   index.html?archive
   =========================================================================== */

function buildArchive(){

const wrap=document.createElement("div");

wrap.id="archive";

const head=document.createElement("div");

head.className="archiveHead";

head.innerHTML=

'<h1>Every Day That Mattered</h1>'+

'<p class="archiveSub">'+EDITIONS.length+

(EDITIONS.length===1?" edition":" editions")+" and counting</p>";

wrap.appendChild(head);

// Only things that have actually happened, unless previewing.
const list=editionsSoFar();

const years=[];

list.forEach(e=>{ if(years.indexOf(e.year)===-1) years.push(e.year); });

if(!list.length){

const empty=document.createElement("p");

empty.className="archiveEmpty";

empty.textContent="Nothing here yet. The first one is still on its way.";

wrap.appendChild(empty);

}

years.forEach(year=>{

const block=document.createElement("section");

block.className="archiveYear";

const label=document.createElement("h2");

label.textContent=year;

block.appendChild(label);

const grid=document.createElement("div");

grid.className="archiveGrid";

list.filter(e=>e.year===year).forEach(e=>{

const card=document.createElement("a");

card.className="archiveCard";

card.href="index.html?preview="+encodeURIComponent(e.id);

card.setAttribute("data-occasion-card",e.occasion);

const cover=e.cover

?(/[\/]/.test(e.cover)?e.cover:e.photoBase+e.cover)

:(e.memories.length?e.memories[0].src:"");

if(cover){

const img=document.createElement("img");

img.src=cover;

img.alt="";

img.loading="lazy";

img.decoding="async";

card.appendChild(img);

}

const body=document.createElement("div");

body.className="archiveCardBody";

body.innerHTML=

'<span class="archiveOccasion">'+e.occasionName+"</span>"+

'<span class="archiveDate">'+

e.date.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})+

"</span>"+

'<span class="archiveCount">'+e.memories.length+

(e.memories.length===1?" memory":" memories")+"</span>";

card.appendChild(body);

grid.appendChild(card);

});

block.appendChild(grid);

wrap.appendChild(block);

});

const back=document.createElement("a");

back.className="archiveBack";

back.href="index.html";

back.textContent="Back to today";

wrap.appendChild(back);

return wrap;

}

/* Show the shelf instead of the story when the address ends in ?archive */
if(editionQuery("archive")!==null){

document.addEventListener("DOMContentLoaded",()=>{

document.getElementById("loader").style.display="none";

const site=document.getElementById("website");

site.style.display="block";

site.innerHTML="";

site.appendChild(buildArchive());

document.body.style.overflowY="auto";

document.body.classList.add("archiveMode");

});

}
else{

/* Otherwise put a quiet link to the shelf at the end of the story. */

document.addEventListener("DOMContentLoaded",()=>{

if(EDITIONS.length<2) return;   // nothing to look back on yet

const finale=document.getElementById("finale");

if(!finale) return;

const link=document.createElement("a");

link.className="archiveLink";

link.href="index.html?archive";

link.textContent="Every day that mattered";

finale.appendChild(link);

});

}
