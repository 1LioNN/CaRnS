import React from "react";
import { useAuth } from "../Utils/AuthContext.js";
import "./Profile.css"
import defaultavatar from "../assets/icons/defaultavatar.png";
import { Link } from "react-router-dom"

function Profile() {
  const auth = useAuth();
  return (
    <profile className="profile">
      <div className="profile-container">
        <a className="page-title">Profile</a>
        <img className="profile-avatar"
                  style={{ width: 175, height: 175 }}
                  src={defaultavatar}
                  alt="default avatar"
        ></img>
        <h1 style={{color: 'black'}}> E-mail: {auth.user.profile.name} </h1>
      </div>
    </profile>
  );
}

export default Profile;
