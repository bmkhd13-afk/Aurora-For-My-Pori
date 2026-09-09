const endingName=document.getElementById("endingName");
const endingMessage=document.getElementById("endingMessage");
const endingContent = document.getElementById("endingContent");
let endingPlayed = false;

/* ---------- finale falling stars ----------
   Moved here from js/letter.js, where it ran on a setInterval that never
   stopped and appended stars to document.body - they piled up at the very
   bottom of the page instead of inside a scene. Now they live inside the
   finale's own star layer and only spawn while the finale is on screen. */

const finaleStarLayer=document.getElementById("finalStars");

let finaleStarTimer=null;

function spawnFinaleStar(){

if(!finaleStarLayer) return;

// Set the fall distance on the LAYER, not on each star, so it is inherited.
// The finale grows taller when the ending message renders, and stars that
// are already falling need to pick up the new height too.
finaleStarLayer.style.setProperty("--fallDistance",finaleStarLayer.clientHeight+"px");

const s=document.createElement("div");

s.className="finaleStar";

s.style.left=Math.random()*100+"%";

s.style.animationDuration=Math.random()*5+5+"s";

finaleStarLayer.appendChild(s);

setTimeout(()=>{

s.remove();

},10000);

}

function startFinaleStars(){

if(finaleStarTimer) return;

finaleStarTimer=setInterval(spawnFinaleStar,400);

}

function stopFinaleStars(){

clearInterval(finaleStarTimer);

finaleStarTimer=null;

// Clear any stars still mid-fall so nothing keeps animating off screen.
if(finaleStarLayer){

finaleStarLayer

.querySelectorAll(".finaleStar")

.forEach(s=>s.remove());

}

}

const finaleObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startFinaleStars();

if(!endingPlayed){

endingPlayed = true;

playEnding();

}

}

else{

stopFinaleStars();

}

});

},{

/* Fires when the finale overlaps the middle half of the screen.

   This used to be threshold:.6 - "60% of the section is on screen" - which
   quietly stops working once the section grows taller than about 1.7 screens,
   because 60% of it can never fit in the viewport at once. A longer ending
   message in some future edition would have silently killed both the falling
   stars and the replay. Measuring against a band of the screen instead works
   for a section of any height. */

rootMargin:"-25% 0px -25% 0px",

threshold:0

});

finaleObserver.observe(document.getElementById("finale"));

function playEnding(){

// The name sequence comes from the current edition's finale block.
const sequence=EDITION.finale.sequence&&EDITION.finale.sequence.length

?EDITION.finale.sequence

:[EDITION.title];

let i=0;

function next(){

endingName.innerHTML=sequence[i];

endingName.style.opacity=1;

i++;

if(i<sequence.length){

setTimeout(next,1800);

}

else{

setTimeout(()=>{

endingMessage.style.opacity=1;
endingName.style.transition="2s ease";
endingMessage.style.transition="2s ease";

/* The ending message and sign-off come from the current edition. Blank lines
   in the edition file become the paragraph breaks. */
endingMessage.innerHTML=

EDITION.finale.message

.replace(/&/g,"&amp;")

.replace(/</g,"&lt;")

.split(/\n{2,}/)

.map(part=>part.trim().replace(/\n/g,"<br>"))

.filter(Boolean)

.join("<br><br>")

+(EDITION.finale.signoff

?'<br><br><span style="font-size:0.9rem;opacity:.7;">'+

EDITION.finale.signoff

.replace(/&/g,"&amp;")

.replace(/</g,"&lt;")+

"</span>"

:"");
if(!document.getElementById("replayButton")){

    const replay=document.createElement("button");

    replay.id="replayButton";

    replay.innerHTML="Replay Our Story";

    replay.style.marginTop="50px";

    replay.style.display="block";

    replay.style.marginInline="auto";

    endingContent.appendChild(replay);

    replay.onclick=()=>{

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

        // Allow the name sequence to play again when we scroll back down
        setTimeout(()=>{

            endingPlayed = false;

        },1000);

    };

}

},2200);

}

}

next();

}