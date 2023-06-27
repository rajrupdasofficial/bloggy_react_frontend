import React from 'react';
import './static/css/nav.css';
import homeIcon from './static/icons/home.png';
import blazeIcon from './static/icons/blaze.png';
import plusIcon from './static/icons/plus.png';
import bellIcon from './static/icons/bell.png';
import profileIcon from './static/icons/profile.png';
import searchIcon from './static/icons/search.png';
import { useNavigate } from 'react-router-dom';



const NavBar: React.FC = () => {
    const navigate = useNavigate();


     const handleClick = () => {
       // Redirect to Authc component
        navigate('/authc');
     };
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
        <a href="#"><img src={ homeIcon } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src={ blazeIcon  } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src={ plusIcon  } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src={ searchIcon } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#"><img src={ bellIcon  } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
        <a href="#" onClick={handleClick}><img src={ profileIcon } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
    </div>

    </div>
    </div>
  );
};

export default NavBar;

