import React, { useState } from "react";
import "../App.css";
import "./ProfileSideBar.css";
import SideBarBtn from "./SideBarBtn";
import { Link } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext.js";

function ProfileSideBar() {
  const auth = useAuth();
  if (auth.user.userType == "vendor") {
    return (
      <sidebar className="sidebar">
        <div className="sidebar-container">
          <ul>
            <li>
              <Link to="/profile">
                <SideBarBtn text={"Account"} />
              </Link>
            </li>
            <li>
              <Link to="/listings">
                <SideBarBtn text={"Listings"} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <SideBarBtn text={"History"} />
              </Link>
            </li>
          </ul>
        </div>
      </sidebar>
    );
  }
  return (
    <sidebar className="sidebar">
      <div className="sidebar-container">
        <ul>
          <li>
            <Link to="/profile">
              <SideBarBtn text={"Account"} />
            </Link>
          </li>
          <li>
            <Link to="/">
              <SideBarBtn text={"History"} />
            </Link>
          </li>
        </ul>
      </div>
    </sidebar>
  );
}

export default ProfileSideBar;
