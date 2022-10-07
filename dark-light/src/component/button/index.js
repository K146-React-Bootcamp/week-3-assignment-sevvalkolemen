import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function Button() {
  const {theme, setTheme} = useTheme();

  return (
    <div>
        <button type="button" className="btn btn-outline-secondary" onClick={()=> setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
            
        </button>
        
    </div>
  )
}

export default Button