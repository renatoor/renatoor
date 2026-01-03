// Dark mode toggle
// Default to dark mode, persist preference in localStorage

(function() {
  // Check for saved preference, default to 'dark'
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // If no saved preference, default to dark
  const theme = savedTheme || 'dark';
  
  // Apply theme immediately to prevent flash
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
})();

function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Mobile menu toggle
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggleBtn = document.getElementById('menu-toggle');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  
  if (!menu || !toggleBtn) return;
  
  const isOpen = !menu.classList.contains('hidden');
  
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggleBtn = document.getElementById('menu-toggle');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  
  if (!menu) return;
  
  menu.classList.remove('hidden');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
  if (iconOpen) iconOpen.classList.add('hidden');
  if (iconClose) iconClose.classList.remove('hidden');
  
  // Add click outside listener
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);
}

function closeMenu() {
  const menu = document.getElementById('mobile-menu');
  const toggleBtn = document.getElementById('menu-toggle');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');
  
  if (!menu) return;
  
  menu.classList.add('hidden');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  if (iconOpen) iconOpen.classList.remove('hidden');
  if (iconClose) iconClose.classList.add('hidden');
  
  // Remove click outside listener
  document.removeEventListener('click', handleClickOutside);
}

function handleClickOutside(event) {
  const menu = document.getElementById('mobile-menu');
  const toggleBtn = document.getElementById('menu-toggle');
  
  if (!menu || !toggleBtn) return;
  
  // Check if click is outside menu and toggle button
  if (!menu.contains(event.target) && !toggleBtn.contains(event.target)) {
    closeMenu();
  }
}

// Close menu when a mobile menu link is clicked
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
  mobileMenuLinks.forEach(function(link) {
    link.addEventListener('click', closeMenu);
  });
});

// Make functions available globally
window.toggleTheme = toggleTheme;
window.toggleMenu = toggleMenu;
