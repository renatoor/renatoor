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

// Table of Contents toggle (mobile)
function toggleToc() {
  const content = document.getElementById('toc-mobile-content');
  
  if (!content) return;
  
  const isHidden = content.classList.contains('hidden');
  
  if (isHidden) {
    openToc();
  } else {
    closeToc();
  }
}

function openToc() {
  const content = document.getElementById('toc-mobile-content');
  const iconExpand = document.getElementById('toc-icon-expand');
  const iconCollapse = document.getElementById('toc-icon-collapse');
  
  if (!content) return;
  
  content.classList.remove('hidden');
  if (iconExpand) iconExpand.classList.add('hidden');
  if (iconCollapse) iconCollapse.classList.remove('hidden');
  
  // Add click outside listener
  setTimeout(() => {
    document.addEventListener('click', handleTocClickOutside);
  }, 0);
}

function closeToc() {
  const content = document.getElementById('toc-mobile-content');
  const iconExpand = document.getElementById('toc-icon-expand');
  const iconCollapse = document.getElementById('toc-icon-collapse');
  
  if (!content) return;
  
  content.classList.add('hidden');
  if (iconExpand) iconExpand.classList.remove('hidden');
  if (iconCollapse) iconCollapse.classList.add('hidden');
  
  // Remove click outside listener
  document.removeEventListener('click', handleTocClickOutside);
}

function handleTocClickOutside(event) {
  const tocMobile = document.getElementById('toc-mobile');
  
  if (!tocMobile) return;
  
  // Check if click is outside the ToC container
  if (!tocMobile.contains(event.target)) {
    closeToc();
  }
}

// Table of Contents scroll spy (highlight active heading) and mobile link click handler
document.addEventListener('DOMContentLoaded', function() {
  const tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length === 0) return;
  
  const headings = [];
  tocLinks.forEach(link => {
    const id = link.getAttribute('href')?.slice(1);
    if (id) {
      const heading = document.getElementById(id);
      if (heading) headings.push({ id, element: heading });
    }
    
    // Close mobile ToC when a link is clicked
    link.addEventListener('click', function() {
      closeToc();
    });
  });
  
  function updateActiveHeading() {
    let current = '';
    const scrollPos = window.scrollY + 100;
    
    for (const { id, element } of headings) {
      if (element.offsetTop <= scrollPos) {
        current = id;
      }
    }
    
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveHeading, { passive: true });
  updateActiveHeading();
});

// Make functions available globally
window.toggleTheme = toggleTheme;
window.toggleMenu = toggleMenu;
window.toggleToc = toggleToc;
