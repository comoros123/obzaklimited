// Tab navigation: shows the selected page container, hides others
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link');
  const pages = document.querySelectorAll('.page-container');

  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      pages.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      document.getElementById(this.getAttribute('data-page')).classList.add('active');
    });
  });

  // --- Automatic Slideshow for all .gallery-slider sections, shows 3 images at a time ---
  document.querySelectorAll('.gallery-slider').forEach(setupGallerySlider);

  function setupGallerySlider(slider) {
    const images = Array.from(slider.querySelectorAll('img'));
    const showCount = 3;
    if (images.length === 0) return;

    let current = 0;

    function updateDisplay() {
      images.forEach((img, idx) => {
        // Show if idx is within the current window
        if (
          (idx >= current && idx < current + showCount) ||
          (current + showCount > images.length && idx < (current + showCount) % images.length)
        ) {
          img.style.display = 'block';
        } else {
          img.style.display = 'none';
        }
      });
    }

    updateDisplay();

    setInterval(() => {
      current = (current + 1) % images.length;
      updateDisplay();
    }, 5000);
  }

  // --- Popup for land-card details with WhatsApp button ---
  // Create popup HTML
  const popup = document.createElement('div');
  popup.id = 'land-popup';
  popup.style.display = 'none';
  popup.style.position = 'fixed';
  popup.style.top = '0';
  popup.style.left = '0';
  popup.style.width = '100vw';
  popup.style.height = '100vh';
  popup.style.background = 'rgba(0,0,0,0.5)';
  popup.style.zIndex = '9999';
  popup.style.justifyContent = 'center';
  popup.style.alignItems = 'center';
  popup.innerHTML = `
    <div id="land-popup-content" style="
      background: #fff;
      border-radius: 16px;
      max-width: 95vw;
      width: 400px;
      padding: 28px 22px 22px 22px;
      box-shadow: 0 8px 40px rgba(34,122,58,0.14);
      position: relative;
      ">
      <button id="close-popup" style="
        position: absolute; 
        top: 12px; 
        right: 12px; 
        background: var(--green, #227a3a); 
        color: #fff; 
        border: none; 
        border-radius: 50%; 
        width: 32px; 
        height: 32px; 
        font-size: 1.3em; 
        cursor: pointer;">&times;</button>
      <div id="popup-land-image" style="text-align:center;margin-bottom:18px;"></div>
      <h3 id="popup-land-title" style="color:var(--green,#227a3a);margin-bottom:4px;"></h3>
      <div id="popup-land-location" style="font-weight:bold;color:var(--brown,#8d6748);margin-bottom:4px;"></div>
      <div id="popup-land-price" style="font-weight:bold;color:var(--brown,#8d6748);margin-bottom:4px;"></div>
      <div id="popup-land-description" style="margin-bottom:14px;color:#222;"></div>
      <a id="popup-whatsapp-btn" href="#" target="_blank" style="
        display:inline-block;
        background:#25D366;
        color:#fff;
        padding:12px 26px;
        border-radius:8px;
        font-weight:bold;
        text-decoration:none;
        font-size:1.05em;
        margin-top:10px;
        box-shadow:0 1px 7px #25D36630;
        transition:background 0.2s,box-shadow 0.2s;
      ">WhatsApp Us About This Land</a>
    </div>
  `;
  document.body.appendChild(popup);

  // Close popup logic
  popup.querySelector('#close-popup').onclick = function() {
    popup.style.display = 'none';
  };
  popup.onclick = function(e) {
    if (e.target === popup) popup.style.display = 'none';
  };

  // Setup land-card click events
  document.querySelectorAll('.land-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.onclick = function() {
      const img = card.querySelector('img');
      const title = card.querySelector('h3') ? card.querySelector('h3').innerText : '';
      const location = card.querySelector('.location') ? card.querySelector('.location').innerText : '';
      const price = card.querySelector('.price') ? card.querySelector('.price').innerText : '';
      const desc = card.querySelector('p') ? card.querySelector('p').innerText : '';

      // Fill popup content
      popup.querySelector('#popup-land-image').innerHTML = img ? `<img src="${img.src}" alt="${img.alt}" style="width:90%;max-width:340px;height:auto;border-radius:12px;border:4px solid var(--green,#227a3a);box-shadow:0 1px 10px #227a3a22;">` : '';
      popup.querySelector('#popup-land-title').innerText = title;
      popup.querySelector('#popup-land-location').innerText = location;
      popup.querySelector('#popup-land-price').innerText = price;
      popup.querySelector('#popup-land-description').innerText = desc;

      // WhatsApp integration
      const whatsappNumber = "254752523244"; // Your number without +
      const whatsappText = encodeURIComponent(`Hello, I am interested in the land "${title}" (${location}, ${price}). Please send me more details.`);
      popup.querySelector('#popup-whatsapp-btn').href = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

      popup.style.display = 'flex';
    };
  });
});