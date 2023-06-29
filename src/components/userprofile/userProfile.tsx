import react from 'react';
import './static/userprofile.css';

const ProfilePage: React.FC = () => {
    return (
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
      </div>
    </div>
    );
}

export default ProfilePage;
