// Dark mode toggle
// Persist preference in localStorage, fallback to system preference

(function() {
  // Check for saved preference, fallback to system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // If no saved preference, use system preference
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  
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
const menuState = {
  menu: null,
  toggleBtn: null,
  iconOpen: null,
  iconClose: null,
  initialized: false
};

function initMenu() {
  if (menuState.initialized) return;
  menuState.menu = document.getElementById('mobile-menu');
  menuState.toggleBtn = document.getElementById('menu-toggle');
  menuState.iconOpen = document.getElementById('menu-icon-open');
  menuState.iconClose = document.getElementById('menu-icon-close');
  menuState.initialized = true;
}

function toggleMenu() {
  initMenu();
  if (!menuState.menu || !menuState.toggleBtn) return;

  const isOpen = !menuState.menu.classList.contains('hidden');
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
}

function openMenu() {
  initMenu();
  if (!menuState.menu) return;

  menuState.menu.classList.remove('hidden');
  if (menuState.toggleBtn) menuState.toggleBtn.setAttribute('aria-expanded', 'true');
  if (menuState.iconOpen) menuState.iconOpen.classList.add('hidden');
  if (menuState.iconClose) menuState.iconClose.classList.remove('hidden');

  // Add click outside listener (delayed to avoid triggering on the same click)
  setTimeout(() => {
    document.addEventListener('click', handleClickOutside);
  }, 0);
}

function closeMenu() {
  initMenu();
  if (!menuState.menu) return;

  menuState.menu.classList.add('hidden');
  if (menuState.toggleBtn) menuState.toggleBtn.setAttribute('aria-expanded', 'false');
  if (menuState.iconOpen) menuState.iconOpen.classList.remove('hidden');
  if (menuState.iconClose) menuState.iconClose.classList.add('hidden');

  document.removeEventListener('click', handleClickOutside);
}

function handleClickOutside(event) {
  if (!menuState.menu || !menuState.toggleBtn) return;

  if (!menuState.menu.contains(event.target) && !menuState.toggleBtn.contains(event.target)) {
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
const tocState = {
  content: null,
  container: null,
  iconExpand: null,
  iconCollapse: null,
  initialized: false
};

function initToc() {
  if (tocState.initialized) return;
  tocState.content = document.getElementById('toc-mobile-content');
  tocState.container = document.getElementById('toc-mobile');
  tocState.iconExpand = document.getElementById('toc-icon-expand');
  tocState.iconCollapse = document.getElementById('toc-icon-collapse');
  tocState.initialized = true;
}

function toggleToc() {
  initToc();
  if (!tocState.content) return;

  const isHidden = tocState.content.classList.contains('hidden');
  if (isHidden) {
    openToc();
  } else {
    closeToc();
  }
}

function openToc() {
  initToc();
  if (!tocState.content) return;

  tocState.content.classList.remove('hidden');
  if (tocState.iconExpand) tocState.iconExpand.classList.add('hidden');
  if (tocState.iconCollapse) tocState.iconCollapse.classList.remove('hidden');

  // Add click outside listener (delayed to avoid triggering on the same click)
  setTimeout(() => {
    document.addEventListener('click', handleTocClickOutside);
  }, 0);
}

function closeToc() {
  initToc();
  if (!tocState.content) return;

  tocState.content.classList.add('hidden');
  if (tocState.iconExpand) tocState.iconExpand.classList.remove('hidden');
  if (tocState.iconCollapse) tocState.iconCollapse.classList.add('hidden');

  document.removeEventListener('click', handleTocClickOutside);
}

function handleTocClickOutside(event) {
  if (!tocState.container) return;

  if (!tocState.container.contains(event.target)) {
    closeToc();
  }
}

// Table of Contents scroll spy (highlight active heading) and mobile link click handler
document.addEventListener('DOMContentLoaded', function() {
  const tocLinks = document.querySelectorAll('.toc-list a');
  if (tocLinks.length === 0) return;

  const tocScrollContainer = document.querySelector('.toc-scroll');

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

  function scrollTocToActiveLink(activeLink) {
    if (!tocScrollContainer || !activeLink) return;

    const containerRect = tocScrollContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    // Check if link is outside the visible area of the container (with some padding)
    const padding = 20;
    const isAbove = linkRect.top < containerRect.top + padding;
    const isBelow = linkRect.bottom > containerRect.bottom - padding;

    if (isAbove || isBelow) {
      // Calculate link position relative to the scroll container's content
      const linkTop = linkRect.top - containerRect.top + tocScrollContainer.scrollTop;
      const targetScroll = linkTop - (containerRect.height / 2) + (linkRect.height / 2);

      tocScrollContainer.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }

  function updateActiveHeading() {
    let current = '';
    const scrollPos = window.scrollY + 100;

    for (const { id, element } of headings) {
      if (element.offsetTop <= scrollPos) {
        current = id;
      }
    }

    let activeLink = null;
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
        activeLink = link;
      } else {
        link.classList.remove('active');
      }
    });

    // Auto-scroll ToC on desktop
    scrollTocToActiveLink(activeLink);
  }

  window.addEventListener('scroll', updateActiveHeading, { passive: true });
  updateActiveHeading();
});

// Make functions available globally
window.toggleTheme = toggleTheme;
window.toggleMenu = toggleMenu;
window.toggleToc = toggleToc;
