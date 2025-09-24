import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const navLinks = ["about", "skills", "projects", "education", "contact"];

  return (
    <nav className="z-10 top-4 left-1/2 -translate-x-1/2 fixed w-[90%] md:w-auto flex flex-row items-center justify-between md:justify-center gap-3 md:gap-8 py-1 md:py-2 px-3 md:px-6 rounded-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-md border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
      
      {/* Logo */}
      <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Portfolio
      </span>

      {/* Nav Links (desktop only) */}
      <div className="hidden md:flex flex-row items-center gap-6">
        {navLinks.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className="relative text-base text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors
                       after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-600 dark:after:bg-indigo-400
                       after:transition-all after:duration-300 hover:after:w-full"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>

      {/* Theme Toggle (always visible) */}
      <ThemeToggle />
    </nav>
  );
}
