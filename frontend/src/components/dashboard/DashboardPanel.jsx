import React from 'react';
import './dashboardpanel.scss';
import { NavLink } from 'react-router-dom';

const DashboardPanel = () => {
  return (
    <div className="dashboard_panel">
      <div className="dashboard__links_panel">
        <ul>
          <li><NavLink to={"/"}>Home</NavLink></li>
          <li><NavLink to={"/dashboard/posts"}>Posts</NavLink></li>
          <li><NavLink to={"/dashboard/tags"}>Tags</NavLink></li>
          <li><NavLink to={"/dashboard/category"}>Categories</NavLink></li>
          <li><NavLink to={"/dashboard/admin/comments"}>Admin- Comments</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardPanel;
