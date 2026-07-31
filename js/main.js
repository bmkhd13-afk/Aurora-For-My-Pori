const loader = document.getElementById("loader");
const website = document.getElementById("website");

setTimeout(() => {

    loader.style.display = "none";
    website.style.display = "block";
    setTimeout(()=>{

document
.getElementById("heroLine")
.classList.add("showHero");

},300);

setTimeout(()=>{

document
.getElementById("heroTitle")
.classList.add("showHero");

},900);

setTimeout(()=>{

document
.getElementById("heroSubtitle")
.classList.add("showHero");

},1700);

setTimeout(()=>{

document
.getElementById("beginBtn")
.classList.add("showHero");

},2500);

},2500);


// ===== Generate Stars =====

const stars =
document.getElementById("globalStars");

for(let i=0;i<180;i++){

    const star=document.createElement("span");

    star.style.position="absolute";

    star.style.width=Math.random()*3+1+"px";

    star.style.height=star.style.width;

    star.style.background="white";

    star.style.borderRadius="50%";

    star.style.left=Math.random()*100+"%";

    star.style.top=Math.random()*100+"%";

    star.style.opacity=Math.random()*0.8+0.2;

star.style.animation=

`twinkle ${Math.random()*4+2}s infinite`;

    star.style.boxShadow="0 0 8px white";

    stars.appendChild(star);

}

const beginBtn = document.getElementById("beginBtn");
const bgMusic = document.getElementById("bgMusic");

beginBtn.addEventListener("click", () => {

    beginBtn.style.transform = "scale(.94)";
beginBtn.style.opacity = ".7";

setTimeout(() => {

    beginBtn.style.transform = "";

    beginBtn.style.opacity = "";

},250);

    document.body.style.overflowY = "auto";
    bgMusic.volume = 0.35;

bgMusic.play().catch(() => {
    console.log("Music playback requires user interaction.");
});

    document.getElementById("chapter1").scrollIntoView({

        behavior:"smooth"

    });

});

const container = document.getElementById("memoryContainer");

memories.forEach((memory,index)=>{

const side=index%2===0?"left":"right";

container.innerHTML+=`

<section class="memory ${side}">

<img src="${memory.image}">

<div class="memoryText">

<span class="memoryNumber">

Memory ${index+1}

</span>

<h2>${memory.title}</h2>

<p>${memory.text.replace(/\n/g,"<br>")}</p>

</div>

</section>

${
index < memories.length - 1
?
`
<div class="sceneDivider">
    <span>✦</span>
</div>
`
:
""
}

`;

});

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.25
});

document.querySelectorAll(".memory").forEach(card=>{

observer.observe(card);

});

const particleContainer =
document.getElementById("globalParticles");

for(let i=0;i<45;i++){

const p=document.createElement("div");

p.className="particle";

p.style.left=Math.random()*100+"%";

p.style.animationDuration=

Math.random()*12+12+"s";

p.style.animationDelay=

Math.random()*10+"s";

particleContainer.appendChild(p);

}

window.addEventListener("scroll",()=>{

const height=

document.documentElement.scrollHeight-

window.innerHeight;

const progress=

(window.scrollY/height)*100;

document.getElementById("progressBar").style.width=

progress+"%";

});

const memoryImages = document.querySelectorAll(".memory img");

window.addEventListener("scroll",()=>{

memoryImages.forEach(img=>{

const rect=img.getBoundingClientRect();

const speed=rect.top*0.03;

img.style.transform=`translateY(${speed}px)`;

});

});