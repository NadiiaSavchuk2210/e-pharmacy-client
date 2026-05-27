const THEME_INIT_SCRIPT = `
(() => {
  try {
    const themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const getStoredTheme = () => {
      const storedTheme = localStorage.getItem('theme');

      return storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : null;
    };
    const getSystemTheme = () => themeQuery.matches ? 'dark' : 'light';
    const applyTheme = (theme, persist = false) => {
      document.documentElement.classList.toggle('dark', theme === 'dark');

      if (persist) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        return;
      }

      delete document.documentElement.dataset.theme;
    };
    const savedTheme = getStoredTheme();
    const theme = savedTheme ?? getSystemTheme();
    let previousSystemTheme = getSystemTheme();

    applyTheme(theme, Boolean(savedTheme));

    themeQuery.addEventListener('change', (event) => {
      const nextSystemTheme = event.matches ? 'dark' : 'light';
      const currentStoredTheme = getStoredTheme();
      const shouldFollowSystem =
        !currentStoredTheme || currentStoredTheme === previousSystemTheme;

      if (shouldFollowSystem) {
        applyTheme(nextSystemTheme, Boolean(currentStoredTheme));
      }

      previousSystemTheme = nextSystemTheme;
    });
  } catch {
    return;
  }
})();
`;

const ThemeInitScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: THEME_INIT_SCRIPT,
      }}
    />
  );
};

export default ThemeInitScript;
