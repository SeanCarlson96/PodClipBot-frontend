
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-200 py-3">
      <div className="container flex justify-between items-center">
        <div>
          <p className="text-center text-gray-500">
            &copy; {new Date().getFullYear()} PodClipBot.com
          </p>
        </div>
        <div>
          <ul className="flex space-x-4">
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-use">Terms of Use</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
