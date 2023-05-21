import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

function Footer() {
    const { theme } = useContext(ThemeContext);
  return (
    <footer>
      <div className="container flex flex-wrap pl-4  justify-between items-center">
        <div className="">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} PodClipBot.com
          </p>
        </div>
        <div className=" ">
          <ul className="flex gap-4 p-0">
            <li>
              <Link className={`${theme === 'light' ? 'text-current' : ''}`} to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link className={`${theme === 'light' ? 'text-current' : ''}`} to="/terms-of-use">Terms of Use</Link>
            </li>
            <li>
              <Link className={`${theme === 'light' ? 'text-current' : ''}`} to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer> 
  );
}

export default Footer;
