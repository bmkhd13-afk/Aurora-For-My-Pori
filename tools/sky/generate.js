/* Projects the real sky over Dhaka at 17:30 (+06) on 13 April 2026 into the
   x/y percentages the constellation section draws with, and writes
   js/skydata.js.

   Projection: azimuthal equidistant, zenith at the centre, horizon at the
   rim - the same geometry as a paper planisphere. North is at the top and
   East at the left, which is correct for a map you hold up and look through
   rather than a map of the ground. */

const fs = require("fs");
const path = require("path");
const { STARS, FIGURES } = require("./catalog.js");

const LAT = 23.8103, LON = 90.4125, TZ = 6;
const Y = 2026, M = 4, D = 13, HOUR_LOCAL = 17.5;

const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;

function julianDay(y, m, d, hourUT) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1))
       + d + B - 1524.5 + hourUT / 24;
}

const JD = julianDay(Y, M, D, HOUR_LOCAL - TZ);
const T = (JD - 2451545.0) / 36525.0;          // Julian centuries since J2000
const years = (JD - 2451545.0) / 365.25;

let gmst = (280.46061837 + 360.98564736629 * (JD - 2451545.0)
          + 0.000387933 * T * T) % 360;
if (gmst < 0) gmst += 360;
const LST = (gmst + LON + 360) % 360;

/* Precess J2000 coordinates to the date. Over 26 years this shifts a star by
   at most about half a degree - invisible on a map 180 degrees across - but
   it is cheap and it is the difference between "close" and "correct". */
function precess(raH, decD) {
  const ra = rad(raH * 15), dec = rad(decD);
  const mSec = 3.07496, nSec = 1.33621, nArc = 20.0431;   // per year
  const dRaSec = mSec + nSec * Math.sin(ra) * Math.tan(dec);
  const dDecArc = nArc * Math.cos(ra);
  let ra2 = raH + (dRaSec * years) / 3600;                 // seconds of time
  let dec2 = decD + (dDecArc * years) / 3600;              // arcseconds
  if (Math.abs(decD) > 87) { ra2 = raH; dec2 = decD; }     // near the pole this
  return [(ra2 % 24 + 24) % 24, dec2];                     // approximation fails
}

function altAz(raH, decD) {
  const ha = rad(((LST - raH * 15) % 360 + 540) % 360 - 180);
  const dec = rad(decD), lat = rad(LAT);
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));
  let az = Math.atan2(-Math.sin(ha) * Math.cos(dec),
                      Math.sin(dec) * Math.cos(lat) - Math.cos(dec) * Math.sin(lat) * Math.cos(ha));
  az = (deg(az) + 360) % 360;      // measured from North, through East
  return { alt: deg(alt), az };
}

// Zenith at the centre of a 100x100 box, horizon on a circle of radius 48.
const R = 48, CX = 50, CY = 50;
function project(alt, az) {
  const r = (90 - alt) / 90 * R;
  return {
    x: CX - r * Math.sin(rad(az)),   // East to the left
    y: CY - r * Math.cos(rad(az))    // North at the top
  };
}

const HORIZON = 1.0;                 // ignore anything hugging the horizon
const visible = new Map();
const rows = [];

for (const [id, name, raH, decD, mag] of STARS) {
  const [ra2, dec2] = precess(raH, decD);
  const { alt, az } = altAz(ra2, dec2);
  if (alt < HORIZON) continue;
  const p = project(alt, az);
  visible.set(id, { id, name, mag, alt, az, x: p.x, y: p.y });
  rows.push({ id, name, mag, alt, az, x: p.x, y: p.y });
}

const lines = [];
for (const [constellation, pairs] of Object.entries(FIGURES)) {
  for (const [a, b] of pairs) {
    if (visible.has(a) && visible.has(b)) {
      const A = visible.get(a), B = visible.get(b);
      lines.push({ c: constellation, x1: A.x, y1: A.y, x2: B.x, y2: B.y });
    }
  }
}

const constellationsUp = [...new Set(lines.map(l => l.c))];

// ---- report, so the numbers can be sanity-checked before they are trusted ----
console.log("Dhaka  " + LAT + "N " + LON + "E   13 April 2026, 17:30 +06");
console.log("JD " + JD.toFixed(5) + "   LST " + (LST / 15).toFixed(4) + " h");
console.log("stars above the horizon: " + rows.length + " of " + STARS.length);
console.log("constellations with at least one line: " + constellationsUp.length);
console.log("  " + constellationsUp.join(", "));
console.log("\nbrightest 14 (altitude / compass bearing):");
rows.slice().sort((a, b) => a.mag - b.mag).slice(0, 14).forEach(s => {
  const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  console.log("  " + s.name.padEnd(18) + "mag " + String(s.mag).padStart(5) +
              "   alt " + s.alt.toFixed(1).padStart(5) + "   az " +
              s.az.toFixed(0).padStart(3) + " (" + dirs[Math.round(s.az / 22.5) % 16] + ")");
});
console.log("\nnotable absences (should be below the horizon at this hour):");
["arcturus","vega","antares","deneb","altair","acrux","fomalhaut"].forEach(id => {
  const s = STARS.find(x => x[0] === id);
  const [r2, d2] = precess(s[2], s[3]);
  const { alt } = altAz(r2, d2);
  console.log("  " + s[1].padEnd(18) + "alt " + alt.toFixed(1) +
              (alt < HORIZON ? "  (below - excluded)" : "  (ABOVE - included)"));
});

// ---- write the data file ----
const r3 = n => Math.round(n * 1000) / 1000;
const out =
`/* The real sky over Dhaka (23.8103N, 90.4125E) at 17:30 local time on
   13 April 2026 - generated, do not hand-edit.

   Coordinates are percentages of the #sky box. The projection is azimuthal
   equidistant with the zenith at the centre and the horizon on a circle of
   radius 48: north at the top, east at the left, the way a planisphere is
   drawn to be held up against the sky.

   ${rows.length} stars were above the horizon at that moment, in
   ${constellationsUp.length} constellation figures. The Sun was still 10
   degrees up - sunset was 18:19 - so none of them were visible to the eye.
   They were simply there. */

const SKY_META={
place:"Dhaka",
when:"13 April 2026, 5:30 PM",
lat:${LAT},
lon:${LON},
starCount:${rows.length}
};

const SKY_STARS=[
${rows.map(s => `{id:"${s.id}",name:${JSON.stringify(s.name)},mag:${s.mag},x:${r3(s.x)},y:${r3(s.y)},alt:${r3(s.alt)},az:${r3(s.az)}}`).join(",\n")}
];

const SKY_LINES=[
${lines.map(l => `{c:${JSON.stringify(l.c)},x1:${r3(l.x1)},y1:${r3(l.y1)},x2:${r3(l.x2)},y2:${r3(l.y2)}}`).join(",\n")}
];
`;

const target = path.join(process.argv[2], "js", "skydata.js");
fs.writeFileSync(target, out.replace(/\n/g, "\r\n"), "utf8");
console.log("\nwrote " + target + "  (" + rows.length + " stars, " + lines.length + " lines)");
