import React from 'react';
import './static/css/nav.css';

const NavBar: React.FC = () => {

  return (
    <div>
      <div className="nav-bar">
        <div className="nav-items">
          <a href="#">Website Title</a>
        </div>
        <div className="nav-items">
          <input type="text" placeholder="Search" />
        </div>
      </div>
       <div className="nav-bar-bottom">
      <div className="navbare">
        <a href="#"><img src="" alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src="" alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src="" alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src="" alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src="" alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src="" alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
    </div>

    </div>
    </div>
  );
};

export default NavBar;

