import React, { createContext, useState, useContext } from "react";

export const darkTheme = {
  background: "#010409",
  surface: "#0d1117",
  border: "#30363d",
  text: "#c9d1d9",
  secondaryText: "#8b949e",
  buttonBg: "#161b22",
  buttonAccent: "#3fb950",
  linkColor: "#7656FE",
  errorText: "#ff7b72",
  errorBackground: "rgba(248, 81, 73, 0.1)",
  emptyStateBackground: "rgba(13, 17, 23, 0.5)",
};

export const lightTheme = {
  background: "#f6f6f6",
  surface: "#fbfefb",
  border: "#d0d7de",
  text: "#24292f",
  secondaryText: "#57606a",
  buttonBg: "#f6f8fa",
  buttonAccent: "#3fb950",
  linkColor: "#7656FE",
  errorText: "#cf222e",
  errorBackground: "rgba(248, 81, 73, 0.05)",
  emptyStateBackground: "rgba(246, 248, 250, 0.5)", 
};

type Theme = typeof darkTheme;

interface ThemeContextType {
  isDarkMode: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
