const starData = [

{
x:12,
y:42,
title:"Our First Date",
text:"Where our story quietly began."
},

{
x:28,
y:24,
title:"Blue Saree",
text:"The day my heart skipped a beat."
},

{
x:44,
y:55,
title:"North End",
text:"Apparently we needed social distancing."
},

{
x:63,
y:28,
title:"Sonargaon",
text:"The day my Pori looked heavenly."
},

{
x:84,
y:46,
title:"InterContinental",
text:"Home is wherever you're smiling."
}

];

const sky=document.getElementById("sky");
const popup=document.getElementById("memoryPopup");
const popupTitle=document.getElementById("popupTitle");
const popupText=document.getElementById("popupText");

let clicked=0;

starData.forEach((star,index)=>{

const dot=document.createElement("div");

dot.className="star";

dot.style.left=star.x+"%";
dot.style.top=star.y+"%";

dot.dataset.index=index;

dot.onclick=()=>{

if(dot.classList.contains("active")) return;

dot.classList.add("active");

clicked++;

popup.classList.add("show");

popupTitle.textContent=star.title;
popupText.textContent=star.text;

drawLine(index);

if(clicked===starData.length){

setTimeout(showSecret,1200);

}

};

sky.appendChild(dot);

});

function drawLine(index){

if(index===0) return;

const prev=starData[index-1];
const curr=starData[index];

const line=document.createElement("div");

line.className="line";

const dx=curr.x-prev.x;
const dy=curr.y-prev.y;

const length=Math.sqrt(dx*dx+dy*dy);

line.style.width=length+"%";

line.style.left=prev.x+"%";
line.style.top=prev.y+"%";

const angle=Math.atan2(dy,dx)*180/Math.PI;

line.style.transform=`rotate(${angle}deg)`;

sky.appendChild(line);

}

function showSecret(){

popupTitle.innerHTML="✨ Secret Unlocked";

popupText.innerHTML=`

My favorite constellation

has never been in the sky.

<br><br>

It's always been us. ❤️

`;

}