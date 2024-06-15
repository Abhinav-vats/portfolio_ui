import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you'll create some CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/"><div className="text-white">MyPortfolio</div></Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/login"><div className="text-white-sm">Login</div></Link></li>
        {/* <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
