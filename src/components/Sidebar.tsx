import { NavLink } from "react-router-dom";
import "../styles/layout/Sidebar.scss";
import Icon from "react-icons-kit";
import { layout } from "react-icons-kit/feather/layout";
import { trendingUp } from "react-icons-kit/feather/trendingUp";
import { users } from "react-icons-kit/feather/users";
import { droplet } from "react-icons-kit/feather/droplet";
import { userCheck } from "react-icons-kit/feather/userCheck";
import { image } from "react-icons-kit/feather/image";
import { barChart2 } from "react-icons-kit/feather/barChart2";

// define type for sidebar props
interface SidebarProps {
  sidebarToggled: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarToggled }) => {
  return (
    <div className={`sidebar ${sidebarToggled && "hidden"}`}>
      <div className="sidebar-links-container">
        <NavLink to="/" className="sidebar-link">
          <Icon icon={layout} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Dashboard</span>
        </NavLink>
        <NavLink to="/analytics" className="sidebar-link">
          <Icon icon={trendingUp} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Analytics</span>
        </NavLink>
        <NavLink to="/campaigns" className="sidebar-link">
          <Icon icon={droplet} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Campaigns</span>
        </NavLink>
        <NavLink to="/donors" className="sidebar-link">
          <Icon icon={users} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Donors</span>
        </NavLink>
        <NavLink to="/reports" className="sidebar-link">
          <Icon icon={barChart2} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Reports</span>
        </NavLink>
        <NavLink to="/media-center" className="sidebar-link">
          <Icon icon={image} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Media Center</span>
        </NavLink>
        <NavLink to="/users" className="sidebar-link">
          <Icon icon={userCheck} size={20} className="sidebar-icon" />
          <span className="sidebar-text">Users</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
