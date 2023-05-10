import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemedComponent() {
    // const { theme, toggleTheme } = useContext(ThemeContext);
    const { toggleTheme } = useContext(ThemeContext);


    return (
        <div className='flex'>
            {/* Current theme: {theme} */}
            <button className='btn btn-secondary' onClick={toggleTheme}>Toggle theme</button>
        </div>
    );
}

export default ThemedComponent;
