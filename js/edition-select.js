/* ===========================================================================
   WHICH EDITION IS SHOWING?

   The rule: the most recent edition whose date has already arrived.

   So you can write the birthday edition in November and commit it - the site
   keeps showing the previous occasion until 22 December, when the birthday
   edition takes over on its own. Nothing to switch on the day.

   To look at one early, add ?preview= and its name to the address:
       index.html?preview=2027-birthday
   To open the archive shelf:
       index.html?archive
   =========================================================================== */

let EDITION=null;

let EDITION_IS_PREVIEW=false;

function editionQuery(name){

const m=new RegExp("[?&]"+name+"(?:=([^&]*))?").exec(window.location.search);

return m?decodeURIComponent(m[1]||"") : null;

}

function sortEditionsNewestFirst(list){

return list.slice().sort((a,b)=>b.date-a.date);

}

// Everything that has already happened, newest first.
function editionsSoFar(now){

const today=now||new Date();

// Compare by day, so an edition dated today counts as arrived.
today.setHours(23,59,59,999);

return sortEditionsNewestFirst(EDITIONS.filter(e=>e.date<=today));

}

function chooseEdition(){

if(!EDITIONS.length){

editionProblem("the site","No editions loaded. Check the EDITIONS block in index.html.");

return null;

}

const wanted=editionQuery("preview");

if(wanted){

const found=EDITIONS.filter(e=>e.id===wanted)[0];

if(found){

EDITION_IS_PREVIEW=true;

return found;

}

editionProblem("the site",'No edition called "'+wanted+'". Showing the current one instead.');

}

const arrived=editionsSoFar();

if(arrived.length) return arrived[0];

// Nothing has arrived yet (the very first year). Show the oldest one rather
// than a blank page.
return sortEditionsNewestFirst(EDITIONS).pop();

}

EDITION=chooseEdition();

if(EDITION){

// The theme is chosen by this attribute; every themes/*.css file is scoped
// to it, so only one theme's rules apply.
document.documentElement.setAttribute("data-occasion",EDITION.occasion);

document.documentElement.setAttribute("data-edition",EDITION.id);

document.title=EDITION.title+" ❤️";

}

/* A quiet note when you are previewing, so you never mistake a preview for
   the live page. */
if(EDITION_IS_PREVIEW){

window.addEventListener("DOMContentLoaded",()=>{

const tag=document.createElement("div");

tag.id="previewTag";

tag.textContent="Preview · "+EDITION.occasionName+" "+EDITION.year+

" · goes live "+EDITION.date.toLocaleDateString(undefined,

{day:"numeric",month:"long",year:"numeric"});

document.body.appendChild(tag);

});

}
