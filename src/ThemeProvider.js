import React, { useState, useEffect } from 'react';
import { ThemeContext } from './contexts/ThemeContext';

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark'); 

    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.body.className = '';
        document.body.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

