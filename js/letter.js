const envelope=document.getElementById("envelope");

const paper=document.getElementById("paper");

const text=document.getElementById("letterText");

const letter=`

Happy Girlfriend Day, My Pori.

If someone asked me what my favorite memory is...

I'd probably smile...

because choosing just one would be impossible.

Thank you for every laugh.

Every conversation.

Every journey.

Every little moment that slowly became part of my life.

You make ordinary days feel special.

You make ordinary places become memories.

You make ordinary nights...

feel like auroras.

I hope one day...

when we look back at all these memories...

we'll smile the exact same way we do now.

I love you.

Always.
 
 Your Dhrubo ❤️
`;

envelope.onclick=()=>{

envelope.classList.add("open");

setTimeout(()=>{

paper.style.display="block";

paper.style.animation="paperRise 1s forwards";

const music=document.getElementById("bgMusic");

let volume=.35;

const fade=setInterval(()=>{

volume-=0.01;

music.volume=Math.max(volume,.15);

if(volume<=.15){

clearInterval(fade);

}

},120);

typeWriter();

},900);

}

let i=0;

function typeWriter(){

if(i<letter.length){

text.innerHTML+=letter.charAt(i);

i++;

setTimeout(typeWriter,28);

}

if(i===letter.length){
if(document.getElementById("continueFinale")) return;

if(!document.getElementById("continueFinale")){
    
    const next=document.createElement("button");

    next.id="continueFinale";

    next.innerHTML="Continue to the Sky ✨";

    paper.appendChild(next);

    next.onclick=()=>{

        document.getElementById("finale").scrollIntoView({

            behavior:"smooth"

        });

    };

}

}
}

// The falling-star ambience used to live here as a setInterval that never
// stopped and appended to document.body. It now lives in js/finale.js,
// scoped to the finale section. See "finale falling stars" there.
