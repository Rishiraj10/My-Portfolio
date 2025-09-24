import React, { useRef } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    toggleTheme(x, y);
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative z-20"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      ) : (
        <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}
