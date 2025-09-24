import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (x?: number, y?: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = (x = window.innerWidth / 2, y = window.innerHeight / 2) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    // set reveal color + position
    document.documentElement.style.setProperty(
      '--reveal-color',
      nextTheme === 'dark' ? '#000' : '#fff'
    );
    document.documentElement.style.setProperty('--reveal-x', `${x}px`);
    document.documentElement.style.setProperty('--reveal-y', `${y}px`);

    // add revealing class to trigger animation
    document.documentElement.classList.add('revealing');

    // after transition ends, switch theme and cleanup
    setTimeout(() => {
      setTheme(nextTheme);
      document.documentElement.classList.remove('revealing');
    }, 600); // same as css transition duration
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
