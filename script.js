// Reveal on scroll for subtle entrance animations
(function(){
  const s = document;
  const els = s.querySelectorAll('.fade-up');
  if(!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    })
  },{threshold:0.12});
  els.forEach(el=>io.observe(el));
})();
// theme toggle removed per revert request

// Improve focus outlines for keyboard users
(function(){
  function handleFirstTab(e){
    if(e.key === 'Tab'){
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);
})();

// Parallax header background (subtle) and card hover neon pulse
(function(){
  const header = document.querySelector('.futuristic-header');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce && header && window.matchMedia('(min-width:768px)').matches){
    window.addEventListener('scroll', ()=>{
      const sc = window.scrollY * 0.18;
      header.style.backgroundPosition = `center calc(50% + ${sc}px)`;
    }, {passive:true});
  }

  // Add neon pulse class on hover to enhance outline animation
  document.querySelectorAll('.futuristic-card').forEach(card=>{
    card.addEventListener('mouseenter', ()=>card.classList.add('neon'));
    card.addEventListener('mouseleave', ()=>card.classList.remove('neon'));
  });

  // Smooth scrolling for in-page anchor links (respect reduce motion)
  if(!reduce){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        const href = a.getAttribute('href');
        if(href.length>1){
          const el = document.querySelector(href);
          if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
        }
      });
    });
  }
})();
// Scroll to top when Send button clicked
// script.js (Contact Form Submission Handling)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('#contact form');

  if (form) {
    form.addEventListener("submit", (e) => {
      // 1. Check if the form is valid using the browser's built-in check
      if (form.checkValidity()) {
        // If valid, then we prevent the default action 
        // (which would be submitting to a non-existent server page)
        e.preventDefault(); 
        
        // **Optional:** You would normally send data with AJAX here.
        
        // 2. Scroll to top after successful "submission"
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        
        // 3. Reset the form (optional)
        form.reset();

      } else {
        // If NOT valid, the browser will show error messages automatically.
        // We do nothing and allow the browser's default behavior.
      }
    });
  }
});

