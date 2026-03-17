const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzec9m8oJTQKXw7eKzSfScswSuNjdYztRD5UT9ICE7lBnxW_YY3FlbaTDYPElLqG-6Kkw/exec";

// Cursor
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  if(cur && curR){
    cur.style.left=mx+'px';
    cur.style.top=my+'px';
  }
});

setInterval(()=>{
  if(curR){
    rx+=(mx-rx)*0.12;
    ry+=(my-ry)*0.12;
    curR.style.left=rx+'px';
    curR.style.top=ry+'px';
  }
},16);

// Hover effect
document.querySelectorAll('a,button').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    if(cur){
      cur.style.transform='translate(-50%,-50%) scale(2.5)';
      cur.style.opacity='0.5';
    }
  });
  el.addEventListener('mouseleave',()=>{
    if(cur){
      cur.style.transform='translate(-50%,-50%) scale(1)';
      cur.style.opacity='1';
    }
  });
});

// Navbar scroll
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('navbar');
  if(nav){
    nav.classList.toggle('scrolled',window.scrollY>50);
  }
});

// Mobile menu
function toggleMenu(){
  const m = document.getElementById('mobileMenu');
  if(m) m.classList.toggle('open');
}

// FORM SUBMIT
async function submitForm(){
  const req=['f-first','f-last','f-email','f-msg'];

  const bad=req.filter(id=>{
    const el = document.getElementById(id);
    return !el || !el.value.trim();
  });

  if(bad.length){
    bad.forEach(id=>{
      const el=document.getElementById(id);
      if(!el) return;
      el.style.borderColor='rgba(239,68,68,0.7)';
      el.style.background='rgba(239,68,68,0.05)';
      setTimeout(()=>{
        el.style.borderColor='';
        el.style.background='';
      },2500);
    });
    return;
  }

  const data = {
    firstName: document.getElementById('f-first')?.value || "",
    lastName: document.getElementById('f-last')?.value || "",
    email: document.getElementById('f-email')?.value || "",
    phone: document.getElementById('f-phone')?.value || "",
    organization: document.getElementById('f-org')?.value || "",
    country: document.getElementById('f-country')?.value || "",
    type: document.getElementById('f-type')?.value || "",
    message: document.getElementById('f-msg')?.value || "",
    source: window.location.pathname.includes("about") ? "About Page" : "Contact Page"
  };

  try{
  await fetch(SCRIPT_URL,{
  method:"POST",
  mode:"no-cors",
  body: JSON.stringify(data)
});
  }catch(err){
    console.error("Error:",err);
  }

  const formBody = document.getElementById('formBody');
  const success = document.getElementById('formSuccess');

  if(formBody) formBody.style.display='none';
  if(success){
    success.style.display='flex';
    success.style.animation='fadeUp 0.5s ease both';
  }
}

// RESET
function resetForm(){
  ['f-first','f-last','f-email','f-phone','f-org','f-country','f-msg']
  .forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.value='';
  });

  const type = document.getElementById('f-type');
  if(type) type.selectedIndex=0;

  const success = document.getElementById('formSuccess');
  const formBody = document.getElementById('formBody');

  if(success) success.style.display='none';
  if(formBody) formBody.style.display='block';
}

// Animations
const obs=new IntersectionObserver(e=>{
  e.forEach(el=>{
    if(el.isIntersecting){
      el.target.style.animation='fadeUp 0.6s ease both';
      el.target.style.opacity='1';
    }
  });
},{threshold:0.1});

document.querySelectorAll('.info-card,.wp-card')
.forEach(el=>{
  el.style.opacity='0';
  obs.observe(el);
});
