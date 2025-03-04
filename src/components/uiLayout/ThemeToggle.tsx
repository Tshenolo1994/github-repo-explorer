import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-transparent border-none p-2 cursor-pointer flex items-center justify-center"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      style={{ backgroundColor: "transparent" }}
    >
      {isDarkMode ? (
        <FaSun
          className="w-5 h-5"
          style={{ color: theme.text, backgroundColor: "transparent" }}
        />
      ) : (
        <FaMoon
          className="w-5 h-5"
          style={{ color: theme.text, backgroundColor: "transparent" }}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
