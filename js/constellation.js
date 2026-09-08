/* Our Constellation.

   The backdrop is the real sky over Dhaka at 5:30 PM on 13 April 2026,
   generated into js/skydata.js. On top of it sit the five memory stars,
   each anchored to a real named star that was actually above us that
   evening. Click all five to unlock the secret.

   Everything is drawn in one SVG with a 0..100 viewBox, so the geometry is
   exact. The old version measured line lengths with Math.sqrt(dx*dx+dy*dy)
   on percentage coordinates and then applied the result as a width
   percentage - but x% is a percentage of the box width and y% of its
   height, so mixing them gave the wrong length and the wrong angle, and
   the lines only joined the stars by coincidence. */

const sky=document.getElementById("sky");
const popup=document.getElementById("memoryPopup");
const popupTitle=document.getElementById("popupTitle");
const popupText=document.getElementById("popupText");

/* Each memory is pinned to a real star that was up that evening.
   Rigel for the blue saree is not an accident: it is a blue supergiant. */
const starData=[

{
anchor:"sirius",
title:"Our First Date",
text:"Where our story quietly began."
},

{
anchor:"rigel",
title:"Blue Saree",
text:"The day my heart skipped a beat."
},

{
anchor:"capella",
title:"North End",
text:"Apparently we needed social distancing."
},

{
anchor:"regulus",
title:"Sonargaon",
text:"The day my Pori looked heavenly."
},

{
anchor:"pollux",
title:"InterContinental",
text:"Home is wherever you're smiling."
}

];

const SVG_NS="http://www.w3.org/2000/svg";

function svgEl(tag,attrs){

const el=document.createElementNS(SVG_NS,tag);

for(const k in attrs) el.setAttribute(k,attrs[k]);

return el;

}

// Brighter stars are drawn larger and more opaque, the way a real chart does.
function starRadius(mag){

return Math.max(0.16,0.62-mag*0.085);

}

function starOpacity(mag){

return Math.max(0.35,Math.min(1,1.05-mag*0.13));

}

const svg=svgEl("svg",{

viewBox:"0 0 100 100",

class:"skyMap",

"aria-label":"The night sky over Dhaka on 13 April 2026"

});

// The horizon: everything inside this circle was above us that evening.
svg.appendChild(svgEl("circle",{

cx:50,cy:50,r:48,class:"skyHorizon"

}));

// Constellation figures.
const figureGroup=svgEl("g",{class:"skyFigures"});

SKY_LINES.forEach(l=>{

figureGroup.appendChild(svgEl("line",{

x1:l.x1,y1:l.y1,x2:l.x2,y2:l.y2,

class:"skyFigureLine"

}));

});

svg.appendChild(figureGroup);

// The stars themselves.
const starGroup=svgEl("g",{class:"skyStars"});

const starById={};

SKY_STARS.forEach(s=>{

starById[s.id]=s;

const dot=svgEl("circle",{

cx:s.x,cy:s.y,

r:starRadius(s.mag),

class:"skyStar",

opacity:starOpacity(s.mag)

});

dot.appendChild(svgEl("title",{})).textContent=s.name;

starGroup.appendChild(dot);

});

svg.appendChild(starGroup);

// Compass points around the rim.
[["N",50,1.6],["E",1.4,51],["S",50,99],["W",98.6,51]].forEach(([label,x,y])=>{

const t=svgEl("text",{x:x,y:y,class:"skyCompass","text-anchor":"middle"});

t.textContent=label;

svg.appendChild(t);

});

// Lines joining the memory stars, drawn as they are unlocked.
const memoryLineGroup=svgEl("g",{class:"memoryLines"});

svg.appendChild(memoryLineGroup);

sky.appendChild(svg);

// A quiet caption saying exactly which sky this is.
const caption=document.createElement("p");

caption.className="skyCaption";

caption.innerHTML=

SKY_META.place+" &middot; "+SKY_META.when+

" &middot; "+SKY_META.starCount+" stars above us";

sky.parentNode.insertBefore(caption,sky.nextSibling);

/* ---------- the five memory stars ---------- */

let clicked=0;

const placed=[];

starData.forEach((memory,index)=>{

const anchor=starById[memory.anchor];

if(!anchor) return;   // the star was below the horizon; skip rather than guess

const dot=document.createElement("button");

dot.className="star";

dot.type="button";

dot.style.left=anchor.x+"%";

dot.style.top=anchor.y+"%";

dot.dataset.index=index;

dot.setAttribute("aria-label",memory.title+" - "+anchor.name);

const label=document.createElement("span");

label.className="starLabel";

label.textContent=anchor.name;

dot.appendChild(label);

placed.push({memory,anchor,dot});

// Position in `placed`, which can differ from the position in starData if a
// star turned out to be below the horizon.
const myIndex=placed.length-1;

dot.addEventListener("click",()=>{

if(dot.classList.contains("active")) return;

dot.classList.add("active");

clicked++;

popup.classList.add("show");

popupTitle.textContent=memory.title;

popupText.textContent=memory.text;

drawMemoryLine(myIndex);

if(clicked===placed.length){

setTimeout(showSecret,1200);

}

});

sky.appendChild(dot);

});

/* Join this memory star to the previous one. Drawn in the SVG's own
   coordinate space, so the line actually lands on both stars. */
function drawMemoryLine(index){

if(index===0) return;

const prev=placed[index-1];

const curr=placed[index];

if(!prev||!curr) return;

memoryLineGroup.appendChild(svgEl("line",{

x1:prev.anchor.x,y1:prev.anchor.y,

x2:curr.anchor.x,y2:curr.anchor.y,

class:"memoryLine"

}));

}

function showSecret(){

popupTitle.innerHTML="✨ Secret Unlocked";

popupText.innerHTML=`

My favorite constellation

has never been in the sky.

<br><br>

It's always been us. ❤️

`;

}
