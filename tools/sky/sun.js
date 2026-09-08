/* Where was the Sun at 17:30 +06 on 13 April 2026, seen from Dhaka?
   Verifies the time conversion before any star maths is trusted. */

const LAT = 23.8103, LON = 90.4125, TZ = 6;
const rad = d => d * Math.PI / 180, deg = r => r * 180 / Math.PI;

function julianDay(y, m, d, hourUT) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1))
       + d + B - 1524.5 + hourUT / 24;
}

const hourLocal = 17.5;
const hourUT = hourLocal - TZ;              // 11.5 UT
const JD = julianDay(2026, 4, 13, hourUT);
const D = JD - 2451545.0;

// Greenwich mean sidereal time
let gmst = (280.46061837 + 360.98564736629 * D) % 360;
if (gmst < 0) gmst += 360;
const lst = (gmst + LON + 360) % 360;

// Low-precision Sun (good to ~0.01 deg, far beyond what we need)
const g = rad((357.529 + 0.98560028 * D) % 360);
const q = (280.459 + 0.98564736 * D) % 360;
const L = rad((q + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g) + 360) % 360);
const e = rad(23.439 - 0.00000036 * D);
const raSun = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
const decSun = Math.asin(Math.sin(e) * Math.sin(L));

const haSun = ((lst - deg(raSun)) % 360 + 540) % 360 - 180;
const altSun = deg(Math.asin(
  Math.sin(decSun) * Math.sin(rad(LAT)) +
  Math.cos(decSun) * Math.cos(rad(LAT)) * Math.cos(rad(haSun))
));

console.log("JD (13 Apr 2026, 11:30 UT) = " + JD.toFixed(6));
console.log("days since J2000           = " + D.toFixed(6));
console.log("GMST                       = " + gmst.toFixed(4) + " deg");
console.log("Local sidereal time (Dhaka)= " + lst.toFixed(4) + " deg = " +
            (lst / 15).toFixed(4) + " h");
console.log("");
console.log("Sun RA  = " + (((deg(raSun) + 360) % 360) / 15).toFixed(3) + " h");
console.log("Sun Dec = " + deg(decSun).toFixed(2) + " deg");
console.log("Sun hour angle = " + haSun.toFixed(2) + " deg  (" +
            (haSun / 15).toFixed(2) + " h past local noon)");
console.log("Sun ALTITUDE   = " + altSun.toFixed(2) + " deg  -> " +
            (altSun > 0 ? "SUN IS UP, broad daylight" : "below horizon"));

// When does the Sun actually set that day? Scan minute by minute.
let setTime = null;
for (let mins = 15 * 60; mins < 20 * 60; mins++) {
  const hl = mins / 60;
  const jd = julianDay(2026, 4, 13, hl - TZ);
  const dd = jd - 2451545.0;
  let gm = (280.46061837 + 360.98564736629 * dd) % 360; if (gm < 0) gm += 360;
  const ls = (gm + LON + 360) % 360;
  const gg = rad((357.529 + 0.98560028 * dd) % 360);
  const qq = (280.459 + 0.98564736 * dd) % 360;
  const LL = rad((qq + 1.915 * Math.sin(gg) + 0.020 * Math.sin(2 * gg) + 360) % 360);
  const ee = rad(23.439 - 0.00000036 * dd);
  const ra = Math.atan2(Math.cos(ee) * Math.sin(LL), Math.cos(LL));
  const dec = Math.asin(Math.sin(ee) * Math.sin(LL));
  const ha = ((ls - deg(ra)) % 360 + 540) % 360 - 180;
  const alt = deg(Math.asin(Math.sin(dec) * Math.sin(rad(LAT)) +
              Math.cos(dec) * Math.cos(rad(LAT)) * Math.cos(rad(ha))));
  if (alt <= -0.833 && setTime === null) {   // standard refraction/limb allowance
    setTime = Math.floor(hl) + ":" + String(Math.round((hl % 1) * 60)).padStart(2, "0");
    break;
  }
}
console.log("Sunset in Dhaka that day   = about " + setTime + " local");
