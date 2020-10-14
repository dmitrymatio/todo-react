import React, { createContext, useState } from "react";
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState("lightTheme");

    const toggleTheme = () => {
        setThemeMode(prevState => {
          if (prevState === 'lightTheme') {
            return 'darkTheme'
          } else {
            return 'lightTheme'
          }
        })
      }

      const value = { toggleTheme, themeMode }
    const customTheme = theme[themeMode];

    return (
        <AppContext.Provider value={value}>
            <ThemeProvider theme={customTheme}>
                <GlobalStyles />
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
};

export default AppProvider;