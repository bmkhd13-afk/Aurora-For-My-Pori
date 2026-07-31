const canvas=document.getElementById("starCanvas");

const ctx=canvas.getContext("2d");

function resize(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

resize();

window.addEventListener("resize",resize);

const finalStars=[];

for(let i=0;i<250;i++){

finalStars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+0.5,

a:Math.random()

});

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