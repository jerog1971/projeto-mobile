import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      background: isDarkMode ? '#121212' : '#ffffff',
      cardBackground: isDarkMode ? '#1e1e1e' : '#f9f9f9',
      text: isDarkMode ? '#ffffff' : '#333333',
      subtext: isDarkMode ? '#aaaaaa' : '#666666',
      header: isDarkMode ? '#1f1f1f' : '#326696',
      cardBorder: isDarkMode ? '#333333' : '#eeeeee',
      stepCard: isDarkMode ? '#222d42' : '#D0DBF5',
      stepCardBorder: isDarkMode ? '#3f5d96' : '#326696',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
