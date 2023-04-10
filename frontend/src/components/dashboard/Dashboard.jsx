import React from 'react';
import './dashboard.scss';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__links">
        <ul>
          <li><Link to={"/"}>New Post</Link></li>
          <li><Link to={"/"}>All Posts</Link></li>
          <li><Link to={"/"}>All Tags</Link></li>
          <li><Link to={"/"}>All Categories</Link></li>
          <li><Link to={"/"}>Update Profile</Link></li>
          <li><Link to={"/"}>All Comments</Link></li>
        </ul>
      </div>
      <div className="dashboard__views">
        {/* views */}
      </div>
    </div>
  );
};

export default Dashboard;
