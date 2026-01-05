import Alpine from 'alpinejs';

// Theme toggle function (used by Alpine)
window.toggleTheme = function() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Initialize Alpine
window.Alpine = Alpine;
Alpine.start();

// Table of Contents scroll spy (highlight active heading)
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
  });

  function scrollTocToActiveLink(activeLink) {
    if (!tocScrollContainer || !activeLink) return;

    const containerRect = tocScrollContainer.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    const padding = 20;
    const isAbove = linkRect.top < containerRect.top + padding;
    const isBelow = linkRect.bottom > containerRect.bottom - padding;

    if (isAbove || isBelow) {
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

    scrollTocToActiveLink(activeLink);
  }

  window.addEventListener('scroll', updateActiveHeading, { passive: true });
  updateActiveHeading();
});
