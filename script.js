// Initial theme setup
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
  document.documentElement.classList.add('dark');
  iconSun.classList.add('hidden');
  iconMoon.classList.remove('hidden');
} else {
  iconSun.classList.remove('hidden');
  iconMoon.classList.add('hidden');
}

themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  setIcons();
});

function setIcons() {
  if (document.documentElement.classList.contains('dark')) {
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
  } else {
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
  }
}

// Mobile menu toggle
document.getElementById('mobileOpen').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

// Profile zoom toggle
const profilePic = document.getElementById('profilePic');
profilePic.addEventListener('click', () => {
  profilePic.classList.toggle('enlarged');
  if (profilePic.classList.contains('enlarged')) {
    profilePic.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
});

// Portfolio filter
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('bg-primary', 'text-white'));
    chip.classList.add('bg-primary', 'text-white');

    const filter = chip.dataset.filter;
    cards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.type === filter) ? '' : 'none';
    });
  });
});
document.querySelector('.chip[data-filter="all"]').classList.add('bg-primary', 'text-white');

// Lightbox functionality (updated)
document.querySelectorAll('.viewBtn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const type = card.dataset.type; 
    const githubLink = card.dataset.link; 
    const videoUrl = card.dataset.video; 
    const title = card.querySelector('h3')?.innerText || '';
    const desc = card.querySelector('p')?.innerText || '';

    // Redirect ke GitHub
    if (type === 'code' && githubLink) {
      window.open(githubLink, '_blank');
      return;
    }

    // Tampilkan video Drive
    if (type === 'video' && videoUrl) {
      lightboxContent.innerHTML = `
        <iframe 
          src="${videoUrl}" 
          class="w-full max-w-3xl aspect-video rounded-xl shadow-lg"
          allow="autoplay; fullscreen"
          allowfullscreen>
        </iframe>
        <div class="text-center mt-4">
          <h4 class="font-semibold text-lg mb-1">${title}</h4>
          <p class="text-sm text-gray-500 dark:text-gray-400">${desc}</p>
        </div>
      `;
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      return;
    }

    // Case 3: Default fallback untuk item lain (misalnya gambar biasa)
    const images = card.dataset.images 
      ? card.dataset.images.split(',') 
      : [card.querySelector('img')?.src || ''];

    lightboxContent.innerHTML = `
      <div class="lightbox-floating">
        ${images.map(src => `<img src="${src}" alt="${title}" />`).join('')}
      </div>
      <div class="text-center mt-4">
        <h4 class="font-semibold text-lg mb-1">${title}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">${desc}</p>
      </div>
    `;

    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    // Add zoom effect gambar
    lightboxContent.querySelectorAll('img').forEach(img => {
      img.addEventListener('click', () => {
        img.style.transform = 'scale(2)';
        img.style.zIndex = '100';
        setTimeout(() => {
          img.style.transform = '';
          img.style.zIndex = '';
        }, 1500);
      });
    });
  });
});

// Close lightbox
closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
});

// Close lightbox saat klik area luar
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  }
});

