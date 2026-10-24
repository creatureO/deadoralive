/* ============================================================= LIGHTBOX (paste over your existing lightbox section in main.js) */
let currentImages = [];
let currentIndex = 0;
 
function openLightbox(el) {
  document.getElementById('lightbox-caption').innerHTML = el.dataset.caption;
  document.getElementById('lightbox').classList.remove('hidden');
 
  // Build the mixed-media array
  if (el.dataset.images) {
    currentImages = JSON.parse(el.dataset.images);
  } else if (el.dataset.youtube) {
    currentImages = [{ type: 'youtube', src: el.dataset.youtube }];
  } else if (el.dataset.video) {
    currentImages = [{ type: 'video', src: el.dataset.video }];
  } else if (el.dataset.glb) {
    currentImages = [{ type: 'model-viewer', src: el.dataset.glb }];
  } else {
    currentImages = [{ type: 'image', src: el.src }];
  }
 
  currentIndex = 0;
  showSlide();
}
 
function showSlide() {
  const img = document.getElementById('lightbox-img');
  const modelViewer = document.getElementById ('model-viewer');
  const video = document.getElementById('lightbox-video');
  const youtube = document.getElementById('lightbox-youtube');
 
  // Reset all media, and pause/clear video so it doesn't keep playing in the background
  img.classList.add('hidden');
  modelViewer.classList.add('hidden');
  video.classList.add('hidden');
  video.pause();
  video.src = '';
  youtube.classList.add('hidden');
  youtube.src = '';
 
  const slide = currentImages[currentIndex];
 
  if (slide.type === 'youtube') {
    youtube.src = `https://www.youtube.com/embed/${slide.src}?autoplay=1`;
    youtube.classList.remove('hidden');
  } else if (slide.type === 'video') {
    video.src = slide.src;
    video.classList.remove('hidden');
    video.play();
  } else if (slide.type === 'model-viewer'){
    modelViewer.src = slide.src;
    modelViewer.classList.remove('hidden');
  } else {
    img.src = slide.src;
    img.classList.remove('hidden');
  }
 
  // hide arrows if there's only one slide
  const showArrows = currentImages.length > 1;
  document.getElementById('lightbox-prev').style.display = showArrows ? 'block' : 'none';
  document.getElementById('lightbox-next').style.display = showArrows ? 'block' : 'none';
}
 
function changeSlide(direction) {
  currentIndex += direction;
  if (currentIndex >= currentImages.length) currentIndex = 0;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  showSlide();
}
 
function closeLightbox() {
  document.getElementById('lightbox').classList.add('hidden');
  document.getElementById('lightbox-video').pause();
  document.getElementById('lightbox-video').src = '';
  document.getElementById('lightbox-youtube').src = '';
}
 
// NEW: Escape key closes the lightbox (only when it's actually open)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !document.getElementById('lightbox').classList.contains('hidden')) {
    closeLightbox();
  }
});
/* ===== END LIGHTBOX ===== */


//scrollrow stuff ===============================================================================================================
function scrollRow(btn, direction) {
  const wrapper = btn.closest('.work-row-wrapper');
  const row = wrapper.querySelector('.workRow');
  const scrollAmount = 600;
  row.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}


//================================================================================================================ home nav button
const clickToOpen=document.getElementById("clickToOpen");
const menu = document.querySelector('nav');
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const hamburgerMenuClose = document.querySelector('.hamburgerMenuClose');
clickToOpen.addEventListener('click', (e) => {
    menu.classList.toggle('clicked');
    hamburgerMenu.classList.toggle('clicked');
    hamburgerMenuClose.classList.toggle('clicked');
  console.log("Phone is active");
  e.stopPropagation(); // prevents this same click from being seen as an "outside" click below
});
document.addEventListener('click', (e) => {
  const isOpen = menu.classList.contains('is-open');
  if (isOpen && !clickedInsideMenu) {
    menu.classList.remove('clicked');
  }
});
/*phone home nav button*/

//custom circle cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
  // Update the circle's position based on viewport coordinates
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});


//scrollrow backgrond color change ===============================================================================================================
// 1. Grab the container and all the target box territories
const container = document.querySelector('.workRow');
const boxes = document.querySelectorAll('.territory');
const sectionTitle = document.querySelector('.sectionTitle');

// 3. Create the observer callback function
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // FIX: Check if it's intersecting OR if it's already the primary visible item on load
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      const activeColor = entry.target.getAttribute('data-color');
      const sectionTitleText = entry.target.getAttribute('data-caption');
      container.style.backgroundColor = activeColor;
      sectionTitle.textContent = sectionTitleText;
    }
  });
}, {
  root: container,
  threshold: 0.4 // Dropping slightly from 0.6 ensures a smooth load transition
});

// 4. Tell the observer to actively watch every box territory
boxes.forEach(box => observer.observe(box));
