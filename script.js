/* ===============================================================
   MAIN JS (externalized)
   Simpan file ini sebagai script.js
=================================================================== */

/* -----------------------
   Element references
------------------------*/
const warpCanvas = document.getElementById('warpCanvas');
const crystalCanvas = document.getElementById('crystalCanvas');
const fogCanvas = document.getElementById('fogCanvas');
const starCanvas = document.getElementById('starCanvas');
const qrisImg = document.getElementById('qrisImg');

/* ===============================================================
   COPY & QR
=================================================================== */
function copyText(id){
  const txt = document.getElementById(id).textContent;
  navigator.clipboard.writeText(txt).then(() => {
    alert("Disalin!");
  }).catch(() => {
    alert("Gagal menyalin.");
  });
}

function downloadQR(){
  const a = document.createElement("a");
  a.href = qrisImg.src;
  a.download = "QRIS.jpg";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ===============================================================
   THEME SWITCH
=================================================================== */
function setTheme(main, soft){
  document.documentElement.style.setProperty("--neon", main);
  document.documentElement.style.setProperty("--neon-soft", soft);
  document.documentElement.style.setProperty("--neon-shadow", main + "66");
}

/* ===============================================================
   EFFECT SWITCH (SHOW/HIDE CANVAS)
=================================================================== */
function setEffect(mode){
  warpCanvas.style.display = "none";
  crystalCanvas.style.display = "none";
  fogCanvas.style.display = "none";
  starCanvas.style.display = "none";
  if(mode === "warp") warpCanvas.style.display = "block";
  if(mode === "crystal") crystalCanvas.style.display = "block";
  if(mode === "fog") fogCanvas.style.display = "block";
  if(mode === "star") starCanvas.style.display = "block";
}

/* ===============================================================
   EFFECT 1 — WARP GALAXY TUNNEL
=================================================================== */
const warp = warpCanvas.getContext("2d");
function warpEffect(){
  function init(){
    warpCanvas.width = window.innerWidth;
    warpCanvas.height = window.innerHeight;
    px = [];
    for(let i=0;i<260;i++){
      px.push({
        x: Math.random()*warpCanvas.width - warpCanvas.width/2,
        y: Math.random()*warpCanvas.height - warpCanvas.height/2,
        z: Math.random()*warpCanvas.width
      });
    }
  }

  let px = [];
  init();

  function loop(){
    warp.fillStyle = "rgba(0,0,0,0.25)";
    warp.fillRect(0,0,warpCanvas.width,warpCanvas.height);
    let neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
    px.forEach(p=>{
      p.z -= 14;
      if(p.z <= 0){
        p.x = Math.random()*warpCanvas.width - warpCanvas.width/2;
        p.y = Math.random()*warpCanvas.height - warpCanvas.height/2;
        p.z = warpCanvas.width;
      }
      let k = 128/p.z;
      let x = p.x*k + warpCanvas.width/2;
      let y = p.y*k + warpCanvas.height/2;
      warp.fillStyle = neon;
      warp.fillRect(x,y,4,4);
    });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    init();
  });

  loop();
}
warpEffect();

/* ===============================================================
   EFFECT 2 — CRYSTAL RAIN
=================================================================== */
const crystal = crystalCanvas.getContext("2d");
function crystalEffect(){
  crystalCanvas.width = window.innerWidth;
  crystalCanvas.height = window.innerHeight;
  let drops = [];
  for(let i=0;i<160;i++){
    drops.push({
      x: Math.random()*crystalCanvas.width,
      y: Math.random()*crystalCanvas.height,
      h: Math.random()*30+20
    });
  }

  function loop(){
    let neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
    crystal.clearRect(0,0,crystalCanvas.width,crystalCanvas.height);
    drops.forEach(d=>{
      crystal.fillStyle = neon;
      crystal.fillRect(d.x, d.y, 4, d.h);
      d.y += Math.random()*12+5;
      if(d.y > crystalCanvas.height){
        d.y = -40;
        d.x = Math.random()*crystalCanvas.width;
      }
    });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    crystalCanvas.width = window.innerWidth;
    crystalCanvas.height = window.innerHeight;
  });

  loop();
}
crystalEffect();

/* ===============================================================
   EFFECT 3 — PLASMA FOG
=================================================================== */
const fog = fogCanvas.getContext("2d");
let fogShift = 0;
function fogEffect(){
  fogCanvas.width = window.innerWidth;
  fogCanvas.height = window.innerHeight;

  function loop(){
    fogShift += 0.008;
    let neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
    let grd = fog.createRadialGradient(
      fogCanvas.width/2, fogCanvas.height/2, 80,
      fogCanvas.width/2, fogCanvas.height/2, fogCanvas.width/1.1
    );
    grd.addColorStop(0, neon + "aa");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    fog.fillStyle = grd;
    fog.fillRect(0,0,fogCanvas.width,fogCanvas.height);
    fog.globalAlpha = 0.25;
    fog.drawImage(fogCanvas, Math.sin(fogShift)*10, Math.cos(fogShift)*10);
    fog.globalAlpha = 1;
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    fogCanvas.width = window.innerWidth;
    fogCanvas.height = window.innerHeight;
  });

  loop();
}
fogEffect();

/* ===============================================================
   EFFECT 4 — STARFIELD
=================================================================== */
const star = starCanvas.getContext("2d");
function starEffect(){
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  let stars = [];
  for(let i=0;i<200;i++){
    stars.push({
      x: Math.random()*starCanvas.width,
      y: Math.random()*starCanvas.height,
      s: Math.random()*3
    });
  }

  function loop(){
    star.clearRect(0,0,starCanvas.width,starCanvas.height);
    let neon = getComputedStyle(document.documentElement).getPropertyValue("--neon").trim();
    stars.forEach(s=>{
      star.fillStyle = neon;
      star.fillRect(s.x,s.y,s.s,s.s);
      s.y += s.s*0.6;
      if(s.y > starCanvas.height){ s.y = 0; }
    });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  });

  loop();
}
starEffect();

/* ===============================================================
   DEFAULT EFFECT
=================================================================== */
setEffect("warp");