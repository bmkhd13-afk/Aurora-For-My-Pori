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
threshold:.6
});

finaleObserver.observe(document.getElementById("finale"));

function playEnding(){

const sequence=[

"Umme",

"Umme Arefin",

"Umme Arefin Akhand",

"Umme Arefin Akhand Momo",

"❤️ My Pori ❤️"

];

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

endingMessage.innerHTML=`

In every universe...

<br><br>

In every lifetime...

<br><br>

In every version of our story...

<br><br>

I'd still choose you.
You'd still choose me.

<br><br>

Thank you for being

my peace,

my biggest smile,

my biggest blessing,

my best friend,

my love of my life

<br><br>

Happy Girlfriend Day,

<br><br>

My Pori.

❤️

<br><br>

<span style="font-size:0.9rem;opacity:.7;">

Made with love by Dhrubo

for his

Momo

</span>

`;
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