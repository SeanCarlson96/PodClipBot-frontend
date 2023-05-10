import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemedComponent() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`bg-${theme}-bg text-${theme}-text`}>
            Current theme: {theme}
            <button onClick={toggleTheme}>Toggle theme</button>
        </div>
    );
}

export default ThemedComponent;
