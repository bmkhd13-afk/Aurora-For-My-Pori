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

// Build the whole list as one string and assign it once. The old code did
// container.innerHTML += inside the loop, which re-parsed the entire section
// on every pass and threw away and re-created the <img> elements each time.
const escapeAttr=s=>String(s)
.replace(/&/g,"&amp;")
.replace(/"/g,"&quot;")
.replace(/</g,"&lt;");

const memoryHTML=memories.map((memory,index)=>{

const side=index%2===0?"left":"right";

const divider=index<memories.length-1
?`<div class="sceneDivider"><span>✦</span></div>`
:"";

// width/height come from memories.js. They do not change the rendered size
// (CSS still controls that) - they let the browser reserve the right space
// before the photo arrives, so nothing jumps as lazy-loaded images appear.
return `

<section class="memory ${side}">

<img src="${memory.image}"
alt="${escapeAttr(memory.title)}"
width="${memory.w}"
height="${memory.h}"
loading="lazy"
decoding="async">

<div class="memoryText">

<span class="memoryNumber">

Memory ${index+1}

</span>

<h2>${memory.title}</h2>

<p>${memory.text.replace(/\n/g,"<br>")}</p>

</div>

</section>

${divider}

`;

}).join("");

container.innerHTML=memoryHTML;

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

/* One passive, rAF-throttled scroll handler for the progress bar.

   There used to be a second scroll listener that wrote an inline
   translateY() to every .memory img for a parallax effect. It never worked:
   .memory img runs the imageReveal animation with animation-fill-mode
   forwards, and a filling animation overrides inline styles, so the computed
   transform stayed at the identity matrix no matter what JS wrote. It was
   measured doing nothing on every single scroll event, so it is gone. */

const progressBar=document.getElementById("progressBar");

let scrollTicking=false;

function updateProgress(){

const height=

document.documentElement.scrollHeight-

window.innerHeight;

const progress=height>0?(window.scrollY/height)*100:0;

progressBar.style.width=progress+"%";

scrollTicking=false;

}

window.addEventListener("scroll",()=>{

if(scrollTicking) return;

scrollTicking=true;

requestAnimationFrame(updateProgress);

},{passive:true});

updateProgress();
