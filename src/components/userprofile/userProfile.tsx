import './static/userprofile.css';
import NavBar from '../NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { apiUrl } from '../globals/globalEnv';
import Cookies from 'universal-cookie';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [logoutStatus, setLogoutStatus] = useState(false);

  const handleLogout = async () => {
    try {
      if (apiUrl) {
        const url = `${apiUrl}/users/logout`;
        const response = await axios.post(url);

        toast.success(response.data.msg);

        const cookies = new Cookies();
        cookies.remove('_intercom_secure_token');
        cookies.remove('_intercom_secure_csrf');
        cookies.remove('_intercom_session_id');

        navigate('/');
      } else {
        toast.error("Something went wrong at backend");
      }
    } catch (error) {
      toast.error("Something went wrong at the backend");
    }
  };

  const handleClick = () => {
    setLogoutStatus(true);
  };

  useEffect(() => {
    if (logoutStatus) {
      handleLogout();
    }
  }, [logoutStatus, handleLogout]);


    return (
    <div>
    <NavBar />
    <ToastContainer />
      <div className="profile-page">
      <div className="profile-header">
      <h1>This is my profile </h1>
        {/* Profile header with user avatar, name, and cover photo */}
      </div>
      <div className="profile-body">
        {/* Profile information, bio, and other details */}
      </div>
      <div className="profile-footer">
        {/* Activity feed or additional profile sections */}
        <h1> This is footer section </h1>
        <button className="logout-button" type="submit" onClick={handleLogout}>Logout</button>
      </div>
    </div>
    </div>
    );
}

export default ProfilePage;
