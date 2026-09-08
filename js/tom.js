/* Tom the lizard - a small Easter egg companion.
   Tap him for a short remark, then he scurries somewhere new and buzzes to
   ask for another tap. He keeps clear of text and photos. No browser alerts. */

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

"🦎 Tom: You're lucky, Drobo.",

/* --- the photobooth and Aarong er shiri --- */

"🦎 Tom: That photobooth strip? Framed it. In my head.",

"🦎 Tom: Aarong er shiri: greatest conversation venue in Dhaka. Fight me.",

"🦎 Tom: You two sat on those stairs so long the stairs got attached.",

"🦎 Tom: First date and you already knew. Admit it.",

"🦎 Tom: Four tiny photos. Infinite rewatch value.",

"🦎 Tom: I don't think you two ever really left that conversation.",

/* --- the blue saree --- */

"🦎 Tom: The blue saree. You nearly fainted. I saw everything.",

"🦎 Tom: Third date, first official. Bureaucracy of the heart.",

"🦎 Tom: Blue saree day is a national holiday in this house.",

"🦎 Tom: She walked in and your entire personality rebooted.",

"🦎 Tom: Smiled outside. Screamed inside. Classic Drobo.",

/* --- Northend Tejgaon --- */

"🦎 Tom: Social distancing? At Northend? That barista was JEALOUS.",

"🦎 Tom: Baristas hate this one weird trick: being adorable in public.",

"🦎 Tom: Tejgaon still talks about you two. Probably.",

"🦎 Tom: Maintain social distancing, they said. You maintained eye contact.",

/* --- the spilled dish --- */

"🦎 Tom: You poured an entire dish on her dress and SURVIVED. Legend.",

"🦎 Tom: Clumsy hands, elegant photos. Somehow balanced.",

"🦎 Tom: The power couple pic was born out of pure chaos. Poetic.",

"🦎 Tom: Ruined the outfit. Made the memory. Net win.",

/* --- Sonargaon, first Eid --- */

"🦎 Tom: Sonargaon. Eid. Heaven-sent. My little heart overheated.",

"🦎 Tom: Emnei Pori daaki. The name checks out.",

"🦎 Tom: She looked like an angel. You looked like you'd won a lottery.",

"🦎 Tom: First Eid outing and you still talk about it. Correct.",

/* --- the Polo t-shirts --- */

"🦎 Tom: Matching Polos. Couple goals. Mildly illegal.",

"🦎 Tom: You gifted each other the same thing. Telepathy confirmed.",

"🦎 Tom: Two Polos, one brain cell, infinite love.",

/* --- Madchef DMD --- */

"🦎 Tom: Madchef DMD. Chatpate levels: critical.",

"🦎 Tom: Most chatpate date yet. My scales are still tingling.",

"🦎 Tom: Spicy food, spicier company.",

/* --- hundreds of miles --- */

"🦎 Tom: You crossed hundreds of miles for her. I crossed the room. Once.",

"🦎 Tom: End of the country to her doorstep. Absolute unit.",

"🦎 Tom: Distance tried. Distance lost. Badly.",

"🦎 Tom: Some men send a text. You booked a whole journey.",

/* --- White Canary, AUST, back to office --- */

"🦎 Tom: White Canary, some laughs, then straight back to the office. Worth it.",

"🦎 Tom: Dropped her at AUST and went BACK to work. Discipline. Or madness.",

"🦎 Tom: You were literally starved to see her. Dramatic. Effective.",

"🦎 Tom: Worth every moment, you said. I filed it under 'obviously'.",

/* --- the gifts --- */

"🦎 Tom: Very special gifts. I'm not asking. I'm just saying I noticed.",

"🦎 Tom: Gift game: elite. Wrapping game: we don't discuss it.",

/* --- InterContinental --- */

"🦎 Tom: InterContinental. Look at those smiles. Cute na?",

"🦎 Tom: 'It's my blessing to be with you.' Correct answer, every time.",

/* --- aurora and the sky --- */

"🦎 Tom: Ordinary nights into auroras. That's her whole superpower.",

"🦎 Tom: The sky is showing off tonight. Still second place.",

"🦎 Tom: In every universe. Every single one. I checked them.",

"🦎 Tom: I counted all the stars. She's still brighter. Annoying.",

"🦎 Tom: Aurora's nice. Her laugh is nicer.",

"🦎 Tom: If the sky had a favourite, it would be her.",

/* --- katana --- */

"🦎 Tom: I'd guard her with a katana. I have no thumbs, but still.",

"🦎 Tom: Katana sharp. Her comebacks sharper.",

"🦎 Tom: Anyone upsets My Pori, they answer to a lizard with a sword.",

/* --- tangerines --- */

"🦎 Tom: Tangerines. Go peel one for her. Trust me on this.",

"🦎 Tom: Sweet like tangerines. Slightly sour when hungry. Relatable.",

"🦎 Tom: Bring her tangerines. Take the credit. I'll allow it.",

/* --- mermaid --- */

"🦎 Tom: Mermaid energy. Lizard approved.",

"🦎 Tom: She swims right through the middle of your whole story.",

/* --- 13 April --- */

"🦎 Tom: 13th April. I set a reminder. Did you?",

"🦎 Tom: April 13th is basically a public holiday now.",

"🦎 Tom: Anniversary math: every day counts. That one counts louder.",

"🦎 Tom: Don't forget the 13th. I will find you.",

/* --- Tom being Tom --- */

"🦎 Tom: I'm a lizard. I have standards. She clears them.",

"🦎 Tom: I've been on this wall the whole time. You never noticed.",

"🦎 Tom: Do NOT tell her I talk. She'll want a smarter lizard.",

"🦎 Tom: Official relationship auditor here. Books look great.",

"🦎 Tom: Blink twice if you're obsessed with her. ...I saw that.",

"🦎 Tom: I don't do romance. I make exceptions.",

"🦎 Tom: Yes, I'm still here. No, I don't pay rent.",

"🦎 Tom: I'm small, I'm green, and I ship you two aggressively.",

"🦎 Tom: Lizard wisdom: sit still, look cute, be loved. She's better at it.",

"🦎 Tom: Someone had to supervise this relationship. It was me.",

"🦎 Tom: I could be sunbathing. Instead I'm here, moderating.",

"🦎 Tom: Nobody asked for a narrator lizard. You got one anyway.",

/* --- teasing Dhrubo --- */

"🦎 Tom: Dhrubo. Buddy. Say something nice to her. Right now.",

"🦎 Tom: Text her. No, not later. Now.",

"🦎 Tom: You're doing the smiling-at-your-phone thing again.",

"🦎 Tom: Out of your league. Beautifully, permanently out of your league.",

"🦎 Tom: Be honest, you re-read her messages. I've seen you.",

"🦎 Tom: You built a whole website. Show-off. (Well done though.)",

"🦎 Tom: Fix your hair, she's about to look at you.",

"🦎 Tom: You had one job: don't spill anything. Remember?",

"🦎 Tom: She said yes. Still processing that, aren't you?",

"🦎 Tom: Statistically improbable. Emotionally inevitable.",

/* --- for Momo --- */

"🦎 Tom: Momo, if he's being silly, blink and I'll handle it.",

"🦎 Tom: Pori, you're the best thing on this entire page.",

"🦎 Tom: He talks about you constantly. Constantly.",

"🦎 Tom: Momo, on behalf of all lizards: you're wonderful.",

"🦎 Tom: You make ordinary places into memories. Even this one.",

"🦎 Tom: Happy Girlfriend Day, Pori. From the wall.",

"🦎 Tom: She turned an ordinary night into this. Obviously.",

"🦎 Tom: If you're reading this, Momo, he meant every word.",

/* --- general warmth --- */

"🦎 Tom: Keep scrolling. It gets better. Like you two.",

"🦎 Tom: Ten out of ten. Would supervise again.",

"🦎 Tom: This is the good part. Pay attention.",

"🦎 Tom: Some people find one person. You found the person.",

"🦎 Tom: Hold hands. That's the whole advice.",

"🦎 Tom: Nothing to report. Everything's perfect. Carry on.",

"🦎 Tom: I'd choose you two as my humans. Every time.",

"🦎 Tom: Your story has better writing than most films.",

"🦎 Tom: Still the best couple I've climbed a wall for.",

"🦎 Tom: Take a screenshot of this moment. You'll want it.",

"🦎 Tom: Go on, tell her again. She never gets tired of it.",

"🦎 Tom: Whatever happens: 13th April, photobooth, blue saree. Unbeatable.",

"🦎 Tom: This has been a Tom production. Tap me again.",

"🦎 Tom: One more tap? I have opinions I haven't shared yet."

];

const EDGE=16;

const CLEARANCE=10;      // breathing room around Tom when testing a spot

const TOP_LIMIT=110;     // stay clear of the progress bar, and leave room
                         // above him for the speech bubble

const FADE=340;          // must match the opacity transition in the CSS

let bubbleTimer=null;

let idleTimer=null;

let scrollTimer=null;

let talking=false;

let tomAwake=false;

let tomHidden=true;

let relocating=false;

// Tom is 90px on desktop and smaller on phones (see the 768px media query),
// so read the real rendered size rather than assuming one.
function tomSize(){

return tom.getBoundingClientRect().width||90;

}

/* ---------- keeping Tom off the text and photos ----------
   Tom is position:fixed, so the page slides underneath him: a spot that is
   clear now stops being clear as soon as she scrolls, and the finale's
   message box grows long after he has picked a place to sit. His position is
   therefore re-checked on scroll, on resize, and on a slow timer. */

const CONTENT_SELECTOR=[

"#hero .overlay",

".memory img",

".memoryText",

"#constellation h2",

".constellationSubtitle",

"#sky",

"#memoryPopup",

"#envelope",

"#paper",

"#endingContent",

"#loader h1"

].join(",");

// Content boxes currently on screen, as plain rectangles.
function visibleContentRects(){

const rects=[];

document.querySelectorAll(CONTENT_SELECTOR).forEach(el=>{

const r=el.getBoundingClientRect();

if(r.width===0||r.height===0) return;

if(getComputedStyle(el).visibility==="hidden") return;

if(r.bottom<0||r.top>window.innerHeight) return;

if(r.right<0||r.left>window.innerWidth) return;

rects.push(r);

});

return rects;

}

// How much of Tom would sit on top of something. Zero means the spot is clear.
function overlapArea(x,y,rects,size){

const s=size||tomSize();

const left=x-CLEARANCE;

const right=x+s+CLEARANCE;

const top=y-CLEARANCE;

const bottom=y+s+CLEARANCE;

let total=0;

for(const r of rects){

const w=Math.min(right,r.right)-Math.max(left,r.left);

const h=Math.min(bottom,r.bottom)-Math.max(top,r.top);

if(w>0&&h>0) total+=w*h;

}

return total;

}

// Try a batch of random spots and take the first genuinely clear one.
// Returns how covered the best candidate is, so the caller can decide to hide
// Tom altogether when the screen is simply too full to hold him.
function findClearSpot(rects){

const s=tomSize();

const maxX=Math.max(EDGE,window.innerWidth-s-EDGE);

const minY=TOP_LIMIT;

const maxY=Math.max(minY,window.innerHeight-s-EDGE);

let best={x:EDGE,y:minY,overlap:Infinity};

for(let i=0;i<80;i++){

const x=EDGE+Math.random()*(maxX-EDGE);

const y=minY+Math.random()*(maxY-minY);

const overlap=overlapArea(x,y,rects,s);

if(overlap===0) return {x,y,overlap:0};

if(overlap<best.overlap) best={x,y,overlap};

}

return best;

}

function currentSpotIsClear(rects){

const x=parseFloat(tom.style.left);

const y=parseFloat(tom.style.top);

if(isNaN(x)||isNaN(y)) return false;

return overlapArea(x,y,rects)===0;

}

function placeInstantly(spot){

tom.style.left=spot.x+"px";

tom.style.top=spot.y+"px";

}

/* Tom never slides to a new spot: sliding would drag him straight across the
   words on the way. He fades out, reappears somewhere else, and that reads
   like a lizard scurrying off anyway. */
function vanish(){

// Disappear with no fade at all. Fading out would leave him visibly sitting
// on the words for a third of a second, which is the whole thing we are
// trying to avoid. He only ever fades back IN.
tom.style.transition="none";

tom.classList.remove("visible");

void tom.offsetWidth;

tom.style.transition="";

}

function relocateTo(spot){

if(relocating) return;

relocating=true;

vanish();

setTimeout(()=>{

placeInstantly(spot);

tomHidden=false;

tom.classList.add("visible");

relocating=false;

},FADE);

}

function concealTom(){

if(tomHidden) return;

tomHidden=true;

vanish();

}

function refreshPlacement(){

if(!tomAwake||talking||relocating) return;

const rects=visibleContentRects();

// Hidden: come back only when there is somewhere clear to come back to.
if(tomHidden){

const spot=findClearSpot(rects);

if(spot.overlap===0){

placeInstantly(spot);

tomHidden=false;

tom.classList.add("visible");

}

return;

}

if(currentSpotIsClear(rects)) return;

const spot=findClearSpot(rects);

if(spot.overlap===0) relocateTo(spot);

else concealTom();

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

function setBuzzing(on){

tom.classList.toggle("buzzing",on);

tom.classList.toggle("idle",!on);

}

function speak(){

if(talking||tomHidden) return;

talking=true;

setBuzzing(false);

clearTimeout(bubbleTimer);

tomBubble.textContent=messages[Math.floor(Math.random()*messages.length)];

// Make it measurable, place it, then fade it in.
tomBubble.classList.remove("show");

positionBubble();

requestAnimationFrame(()=>{

positionBubble();

tomBubble.classList.add("show");

});

// Short remark, then he darts off somewhere new and buzzes for another tap.
bubbleTimer=setTimeout(()=>{

tomBubble.classList.remove("show");

setTimeout(()=>{

talking=false;

setBuzzing(true);

const spot=findClearSpot(visibleContentRects());

if(spot.overlap===0) relocateTo(spot);

else concealTom();

},200);

},2200);

resetIdleTimer();

}

// If nobody bothers him for a while, Tom wanders on his own.
function resetIdleTimer(){

clearTimeout(idleTimer);

idleTimer=setTimeout(function wander(){

if(!talking&&!tomHidden){

const spot=findClearSpot(visibleContentRects());

if(spot.overlap===0) relocateTo(spot);

}

idleTimer=setTimeout(wander,26000);

},26000);

}

tom.addEventListener("click",speak);

/* While she is actually scrolling, the page slides underneath a fixed Tom,
   so any spot can become covered mid-scroll. Waiting for the scroll to stop
   would leave him riding over the words the whole way down. Instead he
   vanishes the moment he is covered, and is re-placed once scrolling stops. */

let tomScrollTicking=false;

window.addEventListener("scroll",()=>{

if(!tomScrollTicking){

tomScrollTicking=true;

requestAnimationFrame(()=>{

tomScrollTicking=false;

if(tomAwake&&!tomHidden&&!relocating&&!talking&&

!currentSpotIsClear(visibleContentRects())){

tomHidden=true;

vanish();

}

});

}

clearTimeout(scrollTimer);

scrollTimer=setTimeout(refreshPlacement,250);

},{passive:true});

window.addEventListener("resize",()=>{

refreshPlacement();

if(tomBubble.classList.contains("show")) positionBubble();

});

/* Content can also grow underneath a stationary Tom - the finale's ending
   message renders about thirteen seconds after that section appears and can
   swallow a whole phone screen. No scroll event fires for that, so the
   placement is re-checked on a slow timer as well. */
setInterval(refreshPlacement,400);

/* A timer alone can still leave him sitting on the words for a fraction of a
   second after the message grows, so watch the content boxes directly and
   react the moment one of them changes size. */
if(typeof ResizeObserver!=="undefined"){

const contentObserver=new ResizeObserver(()=>refreshPlacement());

document

.querySelectorAll(CONTENT_SELECTOR)

.forEach(el=>contentObserver.observe(el));

}

// Tom appears quietly a few seconds after the story starts.
setTimeout(()=>{

tomAwake=true;

tom.classList.add("idle");

const spot=findClearSpot(visibleContentRects());

if(spot.overlap===0){

placeInstantly(spot);

tomHidden=false;

tom.classList.add("visible");

}

resetIdleTimer();

},6000);
