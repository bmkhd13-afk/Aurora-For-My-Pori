const endingName=document.getElementById("endingName");
const endingMessage=document.getElementById("endingMessage");
const endingContent = document.getElementById("endingContent");
let endingPlayed = false;

const finaleObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting && !endingPlayed){

endingPlayed = true;

playEnding();

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