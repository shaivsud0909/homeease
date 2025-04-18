import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons for menu toggle

function Header() {
  const auth = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <nav className="container mx-auto flex justify-between items-center p-4">
        {/* Logo and Brand Name (Left-aligned) */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="HomeEase Logo" className="w-10 h-10" />
          <h1 className="text-xl font-bold">HomeEase</h1>
        </Link>

        {/* Desktop Navigation Links (Right-aligned, hidden on mobile) */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="hover:text-blue-200 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-blue-200 transition duration-300">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-200 transition duration-300">
              About
            </Link>
          </li>
          <li>
            <Link to="/testimonials" className="hover:text-blue-200 transition duration-300">
              Testimonials
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-200 transition duration-300">
              Contact
            </Link>
          </li>

          {/* Dashboard Navigation (Based on User Role) */}
          {auth?.user && (
            <>
              <li>
                <Link
                  to={auth.user.role === "worker" ? "/worker-dashboard" : "/user-dashboard"}
                  className="px-4 py-2 bg-white text-blue-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                >
                  Dashboard
                </Link>
              </li>

              {/* Profile Navigation */}
              <li>
                <Link
                  to={auth.user.role === "worker" ? "/worker-profile" : "/user-profile"}
                  className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
                >
                  Profile
                </Link>
              </li>
            </>
          )}

          {/* Login/Register or Logout */}
          {!auth?.token ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-300 shadow-md"
                >
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                onClick={auth.logout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>

        {/* Hamburger Menu Icon (Visible only on mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none hover:text-blue-200 transition duration-300"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu (Collapsible, right-aligned) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-blue-700 p-4 shadow-lg">
          <ul className="flex flex-col space-y-4 items-end">
            <li>
              <Link to="/" className="hover:text-blue-200 transition duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-200 transition duration-300">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-200 transition duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/testimonials" className="hover:text-blue-200 transition duration-300">
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-200 transition duration-300">
                Contact
              </Link>
            </li>

            {/* Dashboard Navigation (Based on User Role) */}
            {auth?.user && (
              <>
                <li>
                  <Link
                    to={auth.user.role === "worker" ? "/worker-dashboard" : "/user-dashboard"}
                    className="px-4 py-2 bg-white text-blue-800 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                  >
                    Dashboard
                  </Link>
                </li>

                {/* Profile Navigation */}
                <li>
                  <Link
                    to={auth.user.role === "worker" ? "/worker-profile" : "/user-profile"}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}

            {/* Login/Register or Logout */}
            {!auth?.token ? (
              <>
                <li>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-300 shadow-md"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
                  onClick={auth.logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;