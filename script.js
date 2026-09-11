const deck = document.getElementById('deck');
const slides = [...document.querySelectorAll('.slide')];
const rail = document.getElementById('rail');
const current = document.getElementById('current');
const total = document.getElementById('total');
const pad = n => String(n).padStart(2,'0');
total.textContent = pad(slides.length);
slides.forEach((s,i)=>{
  const b=document.createElement('button');
  b.title=s.dataset.title||`Слайд ${i+1}`;
  b.onclick=()=>s.scrollIntoView({behavior:'smooth'});
  rail.appendChild(b);
});
const dots=[...rail.children];
let active=0;
function setActive(i){
  active=i; current.textContent=pad(i+1);
  dots.forEach((d,n)=>d.classList.toggle('active',n===i));
}
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting && e.intersectionRatio>.55)setActive(slides.indexOf(e.target));});
},{root:deck,threshold:[.55,.75]});
slides.forEach(s=>observer.observe(s));setActive(0);
const go=d=>slides[Math.max(0,Math.min(slides.length-1,active+d))].scrollIntoView({behavior:'smooth'});
document.getElementById('prev').onclick=()=>go(-1);
document.getElementById('next').onclick=()=>go(1);
document.addEventListener('keydown',e=>{if(['ArrowDown','ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(1)}if(['ArrowUp','ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(-1)}});
document.getElementById('fullscreen').onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch(e){}};
