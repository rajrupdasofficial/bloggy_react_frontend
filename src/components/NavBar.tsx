import React, { useEffect } from 'react';
import './static/css/nav.css';
import homeIcon from './static/icons/home.png';
import blazeIcon from './static/icons/blaze.png';
import plusIcon from './static/icons/plus.png';
import bellIcon from './static/icons/bell.png';
import profileIcon from './static/icons/profile.png';
import searchIcon from './static/icons/search.png';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const homeClick = () => {
      navigate('/');
    }

    //user profile navigation
     const handleClick = () => {
       // Redirect to the appropriate page based on login status
    const isLoggedIn = checkLoggedInStatus();
    if (isLoggedIn) {
      navigate('/userprofile');
    } else {
      navigate('/authc');
    }
     };

     useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = checkLoggedInStatus();
    console.log('User logged in:', isLoggedIn);
  }, []);
      const checkLoggedInStatus = () => {
    // Replace this logic with your actual authentication check
    // For example, you can check if the JWT token exists in the cookie
    const cookies = new Cookies();
    const jwtToken = cookies.get('_intercom_secure_token');
    
    return !!jwtToken;
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
        <a href="#" onClick={homeClick} ><img src={ homeIcon } alt="blaze" style={{ color: 'white', background: 'white', height: '22px', borderRadius: '10px' }} /></a>
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

