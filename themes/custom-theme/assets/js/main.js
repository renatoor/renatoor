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

// Make toggleTheme available globally
window.toggleTheme = toggleTheme;
