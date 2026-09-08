const canvas=document.getElementById("starCanvas");

const ctx=canvas.getContext("2d");

// The canvas is stretched by CSS to fill #finalStars, which fills #finale.
// On mobile the finale grows taller than the viewport once the ending message
// renders, so sizing the bitmap from window.innerHeight stretched the stars
// into ovals. Measure the element we actually cover instead.
function resize(){

const box=canvas.parentElement||canvas;

const w=box.clientWidth||window.innerWidth;

const h=box.clientHeight||window.innerHeight;

// Nothing to draw yet (section still hidden) - keep the old size.
if(w===0||h===0) return;

const oldW=canvas.width||w;

const oldH=canvas.height||h;

canvas.width=w;

canvas.height=h;

// Keep stars in the same relative spots so a resize does not reshuffle them.
finalStars.forEach(star=>{

star.x=star.x/oldW*w;

star.y=star.y/oldH*h;

});

}

const finalStars=[];

for(let i=0;i<250;i++){

finalStars.push({

x:Math.random(),

y:Math.random(),

r:Math.random()*2+0.5,

a:Math.random()

});

}

// Seed positions against the real canvas size.
canvas.width=canvas.parentElement.clientWidth||window.innerWidth;

canvas.height=canvas.parentElement.clientHeight||window.innerHeight;

finalStars.forEach(star=>{

star.x=star.x*canvas.width;

star.y=star.y*canvas.height;

});

window.addEventListener("resize",resize);

// The finale is hidden at first, so re-measure once it has real dimensions.
if(typeof ResizeObserver!=="undefined"){

new ResizeObserver(resize).observe(canvas.parentElement);

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

finalStars.forEach(star=>{

ctx.beginPath();

ctx.fillStyle=`rgba(255,255,255,${
0.4+Math.sin(Date.now()/800+star.x)*0.4
})`;

ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

ctx.fill();

});

requestAnimationFrame(animate);

}

animate();
