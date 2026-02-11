import Alpine from 'alpinejs';

// Theme toggle function (used by Alpine)
window.toggleTheme = function() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Initialize Alpine
window.Alpine = Alpine;
Alpine.start();

// Reading progress bar
const progressBar = document.getElementById('reading-progress');
if (progressBar) {
  const article = document.querySelector('article');
  if (article) {
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      const maxScroll = article.offsetTop + article.offsetHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 1;
      progressBar.style.transform = 'scaleX(' + progress + ')';
    }, { passive: true });
  }
}

function initMobileBlogNavAutoHide() {
  const body = document.body;
  if (!body || !body.classList.contains('is-blog-page')) return;

  const siteHeader = document.querySelector('[data-site-header]');
  if (!siteHeader) return;

  const mobileMedia = window.matchMedia('(max-width: 1023px)');
  const menuToggle = siteHeader.querySelector('[aria-controls="mobile-menu"]');
  const mobileTocBar = document.querySelector('[data-mobile-toc]');
  const TOP_BUFFER = 12;
  const MOBILE_ANCHOR_GAP = 8;
  const TOC_LOCK_MS = 550;

  let lastScrollY = window.scrollY;
  let hiddenOffset = 0;
  let headerHeight = siteHeader.offsetHeight || 77;
  let tocBarHeight = mobileTocBar ? (mobileTocBar.offsetHeight || 48) : 0;
  let scrollTicking = false;
  let tocNavigationLocked = false;
  let tocNavigationUnlockTimeout = null;

  function applyHeaderOffset() {
    const visibleHeight = Math.max(0, headerHeight - hiddenOffset);
    const mobileAnchorOffset = visibleHeight + tocBarHeight + MOBILE_ANCHOR_GAP;
    document.documentElement.style.setProperty('--mobile-header-hide-offset', hiddenOffset + 'px');
    document.documentElement.style.setProperty('--mobile-header-visible-height', visibleHeight + 'px');
    document.documentElement.style.setProperty('--mobile-anchor-offset', mobileAnchorOffset + 'px');
  }

  function setHeaderHeightVars() {
    headerHeight = siteHeader.offsetHeight || 77;
    if (mobileTocBar) {
      tocBarHeight = mobileTocBar.offsetHeight || tocBarHeight || 48;
    }
    document.documentElement.style.setProperty('--mobile-header-height', headerHeight + 'px');
    hiddenOffset = Math.min(hiddenOffset, headerHeight);
    applyHeaderOffset();
  }

  function resetHeaderPosition() {
    hiddenOffset = 0;
    applyHeaderOffset();
  }

  function isMobileMenuOpen() {
    return menuToggle && menuToggle.getAttribute('aria-expanded') === 'true';
  }

  function scrollToTargetWithDynamicOffset(target, behavior) {
    if (!target) return 0;
    const visibleHeight = Math.max(0, headerHeight - hiddenOffset);
    const anchorOffset = visibleHeight + tocBarHeight + MOBILE_ANCHOR_GAP;
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const destinationTop = Math.max(0, targetTop - anchorOffset);
    window.scrollTo({
      top: destinationTop,
      behavior: behavior || 'smooth'
    });
    return destinationTop;
  }

  function lockNavbarDuringTocNavigation() {
    tocNavigationLocked = true;

    if (tocNavigationUnlockTimeout) {
      clearTimeout(tocNavigationUnlockTimeout);
    }

    tocNavigationUnlockTimeout = setTimeout(function() {
      tocNavigationLocked = false;
      lastScrollY = window.scrollY;
      tocNavigationUnlockTimeout = null;
    }, TOC_LOCK_MS);
  }

  function handleViewportChange() {
    setHeaderHeightVars();
    if (!mobileMedia.matches) {
      resetHeaderPosition();
    }
  }

  function handleScrollFrame() {
    scrollTicking = false;
    const currentScrollY = window.scrollY;
    if (!mobileMedia.matches) {
      lastScrollY = currentScrollY;
      return;
    }

    if (tocNavigationLocked) {
      lastScrollY = currentScrollY;
      return;
    }

    const delta = currentScrollY - lastScrollY;

    if (currentScrollY <= TOP_BUFFER || isMobileMenuOpen()) {
      resetHeaderPosition();
      lastScrollY = currentScrollY;
      return;
    }

    hiddenOffset = Math.min(headerHeight, Math.max(0, hiddenOffset + delta));
    applyHeaderOffset();

    if (currentScrollY < 0) {
      resetHeaderPosition();
    }

    lastScrollY = currentScrollY;
  }

  function handleScroll() {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(handleScrollFrame);
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      requestAnimationFrame(function() {
        if (isMobileMenuOpen()) {
          resetHeaderPosition();
        }
      });
    });
  }

  if (mobileTocBar) {
    const mobileTocLinks = mobileTocBar.querySelectorAll('.toc-list a[href^="#"]');
    mobileTocLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        if (!mobileMedia.matches) return;

        const href = link.getAttribute('href');
        if (!href || href.charAt(0) !== '#' || href.length < 2) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;

        event.preventDefault();
        requestAnimationFrame(function() {
          setHeaderHeightVars();
          scrollToTargetWithDynamicOffset(target, 'smooth');
          lockNavbarDuringTocNavigation();
          if (history.replaceState) {
            history.replaceState(null, '', href);
          } else {
            window.location.hash = href;
          }
        });
      });
    });
  }

  window.addEventListener('resize', setHeaderHeightVars, { passive: true });
  window.addEventListener('orientationchange', setHeaderHeightVars, { passive: true });
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('load', setHeaderHeightVars, { passive: true });

  if (typeof mobileMedia.addEventListener === 'function') {
    mobileMedia.addEventListener('change', handleViewportChange);
  } else if (typeof mobileMedia.addListener === 'function') {
    mobileMedia.addListener(handleViewportChange);
  }

  handleViewportChange();
  handleScrollFrame();
}

initMobileBlogNavAutoHide();

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
