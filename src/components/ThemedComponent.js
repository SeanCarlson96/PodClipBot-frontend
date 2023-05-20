import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function ThemedComponent() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="form-switch flex gap-1 items-center">


            <input
                className="form-check-input cursor-pointer my-0"
                type="checkbox"
                checked={theme === 'dark'}
                onClick={toggleTheme}
                readOnly={true}
            />


            <p className="text-xs capitalize">{theme}</p>

        </div>
    );
}

export default ThemedComponent;
