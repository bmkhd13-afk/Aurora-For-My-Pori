/* ===========================================================================
   THE EDITION FORMAT

   Every occasion in every year is one file in editions/. This file reads
   those files. You should never need to change anything here.

   The format inside an edition file is deliberately plain text - no commas,
   no quotes, no brackets to get wrong. Two kinds of line:

       key: value            a setting
       --- block ---         starts a new block (memory, letter, finale)

   Everything after a block heading, until the next one, belongs to it.
   A line starting with # is a note to yourself and is ignored.

   If one field is wrong, only that field is wrong. The rest of the edition
   and the rest of the site keep working, and check.html will tell you in
   plain English what to fix.
   =========================================================================== */

const EDITIONS=[];

const EDITION_PROBLEMS=[];

function editionProblem(where,message){

EDITION_PROBLEMS.push({where:where,message:message});

}

/* The four occasions. Adding a fifth one day means adding a line here and a
   theme file - nothing else. */
const OCCASIONS={

"girlfriend-day":{name:"Girlfriend Day",month:8,day:1},

"anniversary":{name:"Our Anniversary",month:4,day:13},

"valentines":{name:"Valentine's Day",month:2,day:14},

"birthday":{name:"Her Birthday",month:12,day:22}

};

// Split "2026-08-01" into a real date, or null if it is not a date.
function parseEditionDate(value){

const m=/^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(String(value||"").trim());

if(!m) return null;

const d=new Date(+m[1],+m[2]-1,+m[3]);

if(d.getFullYear()!==+m[1]||d.getMonth()!==+m[2]-1||d.getDate()!==+m[3]) return null;

return d;

}

/* Turn the plain text of an edition file into an object. */
function parseEdition(text,sourceName){

const where=sourceName||"an edition";

const edition={

source:where,

settings:{},

memories:[],

letter:"",

finale:{},

constellation:[],

scenes:null

};

let block={type:"top"};

let blockLines=[];

const finishBlock=()=>{

const body=blockLines.join("\n").replace(/^\s*\n+/,"").replace(/\n+\s*$/,"");

if(block.type==="memory"){

if(!block.fields.photo){

editionProblem(where,"A memory has no photo: line. It was skipped.");

}

else{

edition.memories.push({

photo:block.fields.photo,

title:block.fields.title||"",

text:body,

w:+block.fields.width||null,

h:+block.fields.height||null

});

}

}

else if(block.type==="letter"){

edition.letter=body;

}

else if(block.type==="finale"){

edition.finale.sequence=(block.fields.name||"")

.split("|")

.map(s=>s.trim())

.filter(Boolean);

edition.finale.message=body;

edition.finale.signoff=block.fields.signoff||"";

}

else if(block.type==="star"){

if(block.fields.anchor&&block.fields.title){

edition.constellation.push({

anchor:block.fields.anchor,

title:block.fields.title,

text:body||block.fields.text||""

});

}

else{

editionProblem(where,"A star block needs both anchor: and title:. It was skipped.");

}

}

blockLines=[];

};

const lines=String(text).split(/\r?\n/);

for(let i=0;i<lines.length;i++){

const raw=lines[i];

const line=raw.trim();

if(line.startsWith("#")) continue;                 // a note to yourself

const heading=/^-{2,}\s*([a-zA-Z ]+?)\s*-{2,}$/.exec(line);

if(heading){

finishBlock();

const kind=heading[1].trim().toLowerCase();

block={type:kind,fields:{}};

if(["memory","letter","finale","star"].indexOf(kind)===-1){

editionProblem(where,'Unknown block "--- '+kind+' ---". Known blocks are memory, letter, finale and star.');

block={type:"ignored",fields:{}};

}

continue;

}

// key: value, but only when the key looks like a key (letters and dashes)
const pair=/^([a-zA-Z][a-zA-Z\- ]{0,24}):\s*([\s\S]*)$/.exec(raw.trim());

const knownKey=pair&&/^(occasion|date|title|subtitle|dedication|button|music|loader|scenes|sky|sky-place|photo|width|height|name|signoff|anchor|text|cover|year)$/i
.test(pair[1].trim());

if(pair&&knownKey){

const key=pair[1].trim().toLowerCase();

const value=pair[2].trim();

if(block.type==="top") edition.settings[key]=value;

else block.fields[key]=value;

continue;

}

// Anything else is body text for the block we are inside.
if(block.type!=="top") blockLines.push(raw);

else if(line) editionProblem(where,'Line ignored (it is not a setting and not inside a block): "'+line.slice(0,60)+'"');

}

finishBlock();

return edition;

}

/* Called by every edition file. */
function addEdition(text,sourceName){

let edition;

try{

edition=parseEdition(text,sourceName);

}

catch(err){

editionProblem(sourceName||"an edition","Could not be read at all: "+err.message);

return;

}

const s=edition.settings;

const where=edition.source;

const occasion=(s.occasion||"").trim().toLowerCase();

if(!OCCASIONS[occasion]){

editionProblem(where,'occasion: must be one of '+Object.keys(OCCASIONS).join(", ")+

(occasion?' - got "'+occasion+'"':" - it is missing"));

return;

}

const date=parseEditionDate(s.date);

if(!date){

editionProblem(where,'date: must look like 2027-02-14'+(s.date?' - got "'+s.date+'"':" - it is missing"));

return;

}

edition.occasion=occasion;

edition.occasionName=OCCASIONS[occasion].name;

edition.date=date;

edition.year=date.getFullYear();

edition.id=edition.year+"-"+occasion;

edition.title=s.title||"My Pori";

edition.subtitle=s.subtitle||"";

edition.dedication=s.dedication||"";

edition.button=s.button||"Take My Hand";

edition.loader=s.loader||"Gathering our favorite memories... ❤️";

edition.music=s.music||"";

edition.cover=s.cover||"";

// Photos live in a folder named after the edition unless a path is given.
edition.photoBase="assets/editions/"+edition.id+"/";

edition.memories.forEach(m=>{

m.src=/[\/]/.test(m.photo)?m.photo:edition.photoBase+m.photo;

});

if(s.scenes){

edition.scenes=s.scenes.split(",").map(x=>x.trim().toLowerCase()).filter(Boolean);

}

// sky: 2027-04-13 21:00  -> draw the real sky of that moment
if(s.sky){

const sm=/^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{2})$/.exec(s.sky.trim());

if(sm){

edition.sky={

year:+sm[1],month:+sm[2],day:+sm[3],

hour:+sm[4]+(+sm[5])/60,

place:s["sky-place"]||"Dhaka"

};

}

else{

editionProblem(where,'sky: must look like 2027-04-13 21:00 - got "'+s.sky+'"');

}

}

if(EDITIONS.some(e=>e.id===edition.id)){

editionProblem(where,"There is already an edition for "+edition.id+". The duplicate was ignored.");

return;

}

EDITIONS.push(edition);

}
