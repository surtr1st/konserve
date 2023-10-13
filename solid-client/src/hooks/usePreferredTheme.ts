import { createSignal, onCleanup } from 'solid-js';

const CLASS_DARK = 'dark-theme';
const CLASS_LIGHT = 'light-theme';

export function usePreferredTheme() {
  const [isDarkMode, setIsDarkMode] = createSignal(false);
  const root = document.getElementById('root');

  const toggleTheme = () => {
    if (isDarkMode() && root?.classList.contains(CLASS_LIGHT)) {
      root.classList.replace(CLASS_LIGHT, CLASS_DARK);
      setManualTheme(CLASS_DARK.split('-')[0]);
    } else {
      root?.classList.replace(CLASS_DARK, CLASS_LIGHT);
      setManualTheme(CLASS_LIGHT.split('-')[0]);
    }
    setIsDarkMode((value) => !value);
  };

  const setDefaultTheme = (e: MediaQueryListEvent) => {
    const darkTheme = e.matches;
    setIsDarkMode(darkTheme);
    if (root) {
      const containsLightTheme = root.classList.contains(CLASS_LIGHT);
      const containsDarkTheme = root.classList.contains(CLASS_DARK);
      console.log(darkTheme, containsLightTheme, containsDarkTheme);
      if ((darkTheme && !containsLightTheme) || !containsDarkTheme)
        root.className = CLASS_DARK;
      else root.className = CLASS_LIGHT;
    }
  };

  const setManualTheme = (theme: string) => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.theme = theme;
    localStorage.removeItem('theme');
  };

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', setDefaultTheme);

  onCleanup(() => mediaQuery.removeEventListener('change', setDefaultTheme));

  return { isDarkMode, toggleTheme };
}
