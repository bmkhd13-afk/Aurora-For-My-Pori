const tom=document.createElement("img");

tom.src="assets/images/tom/tom.png";

tom.id="tom";

document.body.appendChild(tom);

const messages=[

"🦎 Tom: She looks beautiful today.",

"🦎 Tom: Give My Pori another hug.",

"🦎 Tom: Approved. 10/10 girlfriend.",

"🦎 Tom: Stop staring. Scroll.",

"🦎 Tom: You're lucky, Drobo."

];

tom.onclick=()=>{

const random=Math.floor(Math.random()*messages.length);

alert(messages[random]);

};