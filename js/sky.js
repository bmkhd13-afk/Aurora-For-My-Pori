/* ===========================================================================
   THE REAL SKY, WORKED OUT IN THE BROWSER

   An edition can say:

       sky: 2027-04-13 21:00
       sky-place: Dhaka

   and this file works out which stars were actually above that place at that
   moment, and where they were. Nothing is pre-generated, so a new edition
   needs no tools and no help - just those two lines.

   The projection is azimuthal equidistant: straight up is the centre of the
   circle, the horizon is the rim, and distance from the centre is
   proportional to the angle down from vertical. North is at the top and east
   is on the LEFT, which looks backwards on a road map but is right for a map
   of the sky - you hold it above your head and look up through it.
   =========================================================================== */

/* Always Dhaka. Shahjahanpur and Mohammadpur are about seven kilometres
   apart, which moves a star by a couple of arcminutes - far less than the
   width of the dots on the map. So the sky is the same either way; the names
   are here because it is your sky, over your places, not a generic one. */

const SKY_PLACES={

"dhaka":{name:"Dhaka",lat:23.8103,lon:90.4125,tz:6},

"shahjahanpur":{name:"Shahjahanpur",lat:23.7358,lon:90.4197,tz:6},

"mohammadpur":{name:"Mohammadpur",lat:23.7650,lon:90.3590,tz:6}

// To add a place: copy a line above and put in its latitude, longitude
// and time zone offset from UTC (6 for Bangladesh).

};

const SKY_RAD=Math.PI/180;

const SKY_DEG=180/Math.PI;

function skyJulianDay(y,m,d,hourUT){

if(m<=2){y-=1;m+=12;}

const A=Math.floor(y/100);

const B=2-A+Math.floor(A/4);

return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+B-1524.5+hourUT/24;

}

/* Catalogue positions are for the year 2000. The Earth's axis wobbles, so by
   2027 every star has drifted by up to about half a degree. Invisible on a
   map 180 degrees across, but it costs nothing to be right. */
function skyPrecess(raH,decD,years){

const ra=raH*15*SKY_RAD;

const dec=decD*SKY_RAD;

if(Math.abs(decD)>87) return [raH,decD];   // the approximation blows up here

const dRaSec=3.07496+1.33621*Math.sin(ra)*Math.tan(dec);

const dDecArc=20.0431*Math.cos(ra);

let ra2=raH+(dRaSec*years)/3600;

const dec2=decD+(dDecArc*years)/3600;

ra2=((ra2%24)+24)%24;

return [ra2,dec2];

}

/* Work out the whole sky for one moment in one place.
   `when` is {year, month, day, hour, place} - hour may be fractional. */
function computeSky(when){

const key=String((when&&when.place)||"Dhaka").trim().toLowerCase();

const place=SKY_PLACES[key]||SKY_PLACES["dhaka"];

if(!SKY_PLACES[key]&&typeof editionProblem==="function"){

editionProblem("the sky",'Unknown sky-place "'+when.place+

'". Using Dhaka. Known places: '+

Object.keys(SKY_PLACES).map(k=>SKY_PLACES[k].name).join(", "));

}

const JD=skyJulianDay(when.year,when.month,when.day,when.hour-place.tz);

const D=JD-2451545.0;

const T=D/36525.0;

const years=D/365.25;

let gmst=(280.46061837+360.98564736629*D+0.000387933*T*T)%360;

if(gmst<0) gmst+=360;

const LST=((gmst+place.lon)%360+360)%360;

const R=48,CX=50,CY=50,HORIZON=1.0;

const visible={};

const stars=[];

for(let i=0;i<STARS.length;i++){

const id=STARS[i][0],name=STARS[i][1],mag=STARS[i][4];

const p=skyPrecess(STARS[i][2],STARS[i][3],years);

const ha=(((LST-p[0]*15)%360+540)%360-180)*SKY_RAD;

const dec=p[1]*SKY_RAD;

const lat=place.lat*SKY_RAD;

let sinAlt=Math.sin(dec)*Math.sin(lat)+Math.cos(dec)*Math.cos(lat)*Math.cos(ha);

sinAlt=Math.max(-1,Math.min(1,sinAlt));

const alt=Math.asin(sinAlt)*SKY_DEG;

if(alt<HORIZON) continue;

let az=Math.atan2(

-Math.sin(ha)*Math.cos(dec),

Math.sin(dec)*Math.cos(lat)-Math.cos(dec)*Math.sin(lat)*Math.cos(ha)

)*SKY_DEG;

az=(az+360)%360;                       // from north, through east

const r=(90-alt)/90*R;

const star={

id:id,name:name,mag:mag,alt:alt,az:az,

x:CX-r*Math.sin(az*SKY_RAD),           // east to the left

y:CY-r*Math.cos(az*SKY_RAD)            // north at the top

};

visible[id]=star;

stars.push(star);

}

// A constellation line is drawn only when both of its stars were up.
const lines=[];

for(const constellation in FIGURES){

const pairs=FIGURES[constellation];

for(let i=0;i<pairs.length;i++){

const a=visible[pairs[i][0]],b=visible[pairs[i][1]];

if(a&&b) lines.push({c:constellation,x1:a.x,y1:a.y,x2:b.x,y2:b.y});

}

}

const stamp=new Date(when.year,when.month-1,when.day);

const hh=Math.floor(when.hour);

const mm=Math.round((when.hour-hh)*60);

const ampm=hh>=12?"PM":"AM";

const hour12=hh%12===0?12:hh%12;

return {

stars:stars,

lines:lines,

meta:{

place:place.name,

when:stamp.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})+

", "+hour12+":"+String(mm).padStart(2,"0")+" "+ampm,

starCount:stars.length,

constellations:[...new Set(lines.map(l=>l.c))].length

}

};

}

/* How high was the Sun? Used by check.html to warn you when a sky you have
   chosen was in daylight - the stars were really there, but nobody could see
   them. Above 0 means the Sun was up; below about -18 is proper darkness. */
function sunAltitude(when){

const key=String((when&&when.place)||"Dhaka").trim().toLowerCase();

const place=SKY_PLACES[key]||SKY_PLACES["dhaka"];

const JD=skyJulianDay(when.year,when.month,when.day,when.hour-place.tz);

const D=JD-2451545.0;

let gmst=(280.46061837+360.98564736629*D)%360;

if(gmst<0) gmst+=360;

const LST=((gmst+place.lon)%360+360)%360;

const g=((357.529+0.98560028*D)%360)*SKY_RAD;

const q=(280.459+0.98564736*D)%360;

const L=(((q+1.915*Math.sin(g)+0.020*Math.sin(2*g))%360+360)%360)*SKY_RAD;

const e=(23.439-0.00000036*D)*SKY_RAD;

const ra=Math.atan2(Math.cos(e)*Math.sin(L),Math.cos(L))*SKY_DEG;

const dec=Math.asin(Math.sin(e)*Math.sin(L));

const ha=(((LST-ra)%360+540)%360-180)*SKY_RAD;

const lat=place.lat*SKY_RAD;

return Math.asin(

Math.sin(dec)*Math.sin(lat)+Math.cos(dec)*Math.cos(lat)*Math.cos(ha)

)*SKY_DEG;

}
