import "./Navbar.css";
import logo from "../assets/icons/carns-logo.png";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "../Utils/AuthContext.js";
import avatar from "../assets/icons/avatar.png";
import PopUp from 'reactjs-popup';

function Navbar() {
  const auth = useAuth();

  return (
    <nav className="nav">
      <div className="navbar-container">
        <Link to="/" className="navbarLogo">
          <img
            style={{ width: 80, height: 60 }}
            src={logo}
            alt="carns logo"
          ></img>
        </Link>
        <ul>
          <li>
            <Link to="/rent" className="site-title">
              Rent
            </Link>
          </li>
          <li>
            <Link to="/buy" className="site-title">
              Buy
            </Link>
          </li>
    <li>
    <Link to="/buydetail/634883108fa3b2803f0e6370" className="site-title">
    BuyDetail
    </Link>
    </li>
          </ul>
          {auth.user ? (
            <PopUp trigger={ 
                <img className="profile-icon"
                  style={{ width: 50, height: 50 }}
                  src={avatar}
                  alt="default avatar"
                ></img>
              } position="bottom right"> 
              <div className="profile-popup"> 
              <Link to="/profile" className="popup-item">
                <p> Account </p>
              </Link>
              <Link to="/" className="popup-item">
                <p> Log Out </p>
              </Link>
              </div>
            </PopUp>
          ) : (
            <></>
          )}
        {auth.user ? (
          <></>
        ) : (
          <div className="btn-container">
            <Button
              className="btn"
              style={{
                borderRadius: 40,
                backgroundColor: "#e87123",
                padding: "8px 30px",
                fontSize: "18px",
                color: "#fff",
                marginLeft: "auto",
                marginRight: "20px",
              }}
              variant="contained"
              disableElevation
              href="/signup"
            >
              Sign Up
            </Button>
            <Button
              className="btn"
              style={{
                borderRadius: 40,
                backgroundColor: "#e87123",
                padding: "8px 30px",
                fontSize: "18px",
                color: "#fff",
                marginLeft: "20px",
                marginRight: "50px",
              }}
              variant="contained"
              disableElevation
              href="/signin"
            >
              Log In
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
