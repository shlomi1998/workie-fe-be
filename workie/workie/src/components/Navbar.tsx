import React from 'react';
import './Navbar.scss';
import Logo from './Logo';
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className='navbar'>
    <div className='navbar__container'>
        <Logo/>

        <Link to="/WhoWeAre">
        <button className='navbar__container__whoWeAre'>Who are we?</button>
        </Link>

    </div>
    </nav>
   
  )
}

export default Navbar;

