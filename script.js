// WEDE5020 Part 3 - Tokoza Youth Code Hub
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  const menuBtn = document.createElement('button');
  menuBtn.innerHTML = '☰ Menu'; menuBtn.id='menuToggle';
  menuBtn.style.cssText='display:none;position:absolute;top:15px;right:15px;background:#FFC107;border:none;padding:8px 12px;border-radius:5px;cursor:pointer;font-weight:700';
  header.style.position='relative'; header.appendChild(menuBtn);
  const check = () => { if(window.innerWidth<=768){menuBtn.style.display='block';nav.style.display='none'}else{menuBtn.style.display='block';nav.style.display='flex';nav.style.gap='15px'} };
  check(); window.addEventListener('resize',check);
  menuBtn.addEventListener('click',()=> nav.style.display = nav.style.display==='none'?'flex':'none');

  // Accordion for programmes.html
  document.querySelectorAll('.accordion-header').forEach(h=>{
    h.addEventListener('click',()=>{
      const c = h.nextElementSibling;
      const isOpen = c.style.display==='block';
      document.querySelectorAll('.accordion-content').forEach(x=>x.style.display='none');
      c.style.display = isOpen?'none':'block';
    });
  });

  // Tabs for programmes.html
  document.querySelectorAll('.tab-btn').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.tab-btn').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); document.getElementById(b.dataset.tab).classList.add('active');
    });
  });

  // Lightbox - will work if you have .gallery in index/about
  const lightbox = document.createElement('div'); lightbox.id='lightbox';
  lightbox.style.cssText='display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);justify-content:center;align-items:center;z-index:9999';
  const lbImg = document.createElement('img'); lbImg.style.maxWidth='90%'; lbImg.style.maxHeight='85%'; lbImg.style.borderRadius='8px';
  lightbox.appendChild(lbImg); document.body.appendChild(lightbox);
  document.querySelectorAll('.gallery img').forEach(img=>{
    img.style.cursor='pointer';
    img.addEventListener('click',()=>{lbImg.src=img.src; lightbox.style.display='flex'});
  });
  lightbox.addEventListener('click',()=>lightbox.style.display='none');

  // Form validation for enquiry.html
  const form = document.querySelector('form');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault(); let valid=true; form.querySelectorAll('.error').forEach(el=>el.remove());
      const name = form.querySelector('input[type="text"], input[name="name"]');
      const email = form.querySelector('input[type="email"]');
      const message = form.querySelector('textarea');
      if(name && name.value.trim().length<2){showError(name,'Name must be 2+ letters'); valid=false}
      if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){showError(email,'Valid email required'); valid=false}
      if(message && message.value.trim().length<10){showError(message,'Message 10+ characters'); valid=false}
      if(valid){
        const ok = document.createElement('div'); ok.style.cssText='background:#4CAF50;color:white;padding:12px;border-radius:6px;margin-top:10px';
        ok.textContent = 'Thank you! Your enquiry for Tokoza Youth Code Hub was received.';
        form.appendChild(ok); localStorage.setItem('lastEnquiry', JSON.stringify({name:name?.value, date:new Date()}));
        form.reset(); setTimeout(()=>ok.remove(),5000);
      }
    });
  }
  function showError(input,msg){const s=document.createElement('span'); s.className='error'; s.style.color='#D32F2F'; s.style.fontSize='13px'; s.textContent=msg; input.insertAdjacentElement('afterend',s)}

  // Animations + Back to top
  const obs = new IntersectionObserver(es=>{es.forEach(en=>{if(en.isIntersecting){en.target.style.opacity='1'; en.target.style.transform='translateY(0)'}})});
  document.querySelectorAll('main, .card, section').forEach(el=>{el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='0.6s'; obs.observe(el)});
  const topBtn=document.createElement('button'); topBtn.textContent='↑ Top'; topBtn.style.cssText='display:none;position:fixed;bottom:20px;right:20px;background:#FFC107;border:none;padding:10px 14px;border-radius:20px;cursor:pointer;font-weight:700;z-index:999'; document.body.appendChild(topBtn);
  window.addEventListener('scroll',()=>topBtn.style.display=window.scrollY>300?'block':'none');
  topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
});