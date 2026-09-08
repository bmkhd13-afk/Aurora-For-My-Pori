/* Tom the lizard - a small Easter egg companion.
   Tap him for a short speech bubble, then he scurries somewhere new.
   No browser alerts. */

const tom=document.createElement("img");

tom.src="assets/images/tom/tom.png";

tom.id="tom";

tom.alt="Tom the lizard";

document.body.appendChild(tom);

const tomBubble=document.createElement("div");

tomBubble.id="tomBubble";

document.body.appendChild(tomBubble);

const messages=[

"🦎 Tom: She looks beautiful today.",

"🦎 Tom: Give My Pori another hug.",

"🦎 Tom: Approved. 10/10 girlfriend.",

"🦎 Tom: Stop staring. Scroll.",

"🦎 Tom: You're lucky, Drobo."

];

const TOM_SIZE=90;

const EDGE=16;

let bubbleTimer=null;

let idleTimer=null;

let talking=false;

// Pick a random spot that stays fully on screen, leaving room above Tom
// for the speech bubble and clear of the very top of the page.
function randomSpot(){

const maxX=Math.max(EDGE,window.innerWidth-TOM_SIZE-EDGE);

const minY=140;

const maxY=Math.max(minY,window.innerHeight-TOM_SIZE-EDGE);

return {

x:EDGE+Math.random()*(maxX-EDGE),

y:minY+Math.random()*(maxY-minY)

};

}

function moveTom(instant){

const spot=randomSpot();

// The very first placement should not slide in from the corner.
if(instant){

tom.style.transition="none";

tom.style.left=spot.x+"px";

tom.style.top=spot.y+"px";

void tom.offsetWidth;

tom.style.transition="";

return;

}

tom.style.left=spot.x+"px";

tom.style.top=spot.y+"px";

}

// Park the bubble just above Tom, clamped so it never runs off the edges.
function positionBubble(){

const t=tom.getBoundingClientRect();

const b=tomBubble.getBoundingClientRect();

let left=t.left+t.width/2-b.width/2;

left=Math.min(Math.max(left,EDGE),window.innerWidth-b.width-EDGE);

tomBubble.style.left=left+"px";

tomBubble.style.top=(t.top-b.height-14)+"px";

}

function speak(){

if(talking) return;

talking=true;

clearTimeout(bubbleTimer);

tomBubble.textContent=messages[Math.floor(Math.random()*messages.length)];

// Make it measurable, place it, then fade it in.
tomBubble.classList.remove("show");

positionBubble();

requestAnimationFrame(()=>{

positionBubble();

tomBubble.classList.add("show");

});

// Auto-dismiss, then Tom scurries off to a new spot.
bubbleTimer=setTimeout(()=>{

tomBubble.classList.remove("show");

setTimeout(()=>{

moveTom();

talking=false;

},380);

},2600);

resetIdleTimer();

}

// If nobody bothers him for a while, Tom wanders on his own.
function resetIdleTimer(){

clearTimeout(idleTimer);

idleTimer=setTimeout(function wander(){

if(!talking) moveTom();

idleTimer=setTimeout(wander,26000);

},26000);

}

tom.addEventListener("click",speak);

// On resize just nudge Tom back inside the viewport - randomising here would
// make him jitter while the window is being dragged.
window.addEventListener("resize",()=>{

const maxX=Math.max(EDGE,window.innerWidth-TOM_SIZE-EDGE);

const maxY=Math.max(140,window.innerHeight-TOM_SIZE-EDGE);

const x=Math.min(parseFloat(tom.style.left)||EDGE,maxX);

const y=Math.min(parseFloat(tom.style.top)||140,maxY);

tom.style.left=x+"px";

tom.style.top=y+"px";

if(tomBubble.classList.contains("show")) positionBubble();

});

// Tom appears quietly a few seconds after the story starts.
setTimeout(()=>{

moveTom(true);

tom.classList.add("visible","idle");

resetIdleTimer();

},6000);
