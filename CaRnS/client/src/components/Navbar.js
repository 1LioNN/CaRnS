import './Navbar.css'
import  logo  from "../assets/icons/carns-logo.png"
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Navbar() {
    return ( 
        <nav className = "nav">
            <div className = "navbarContainer">
            <Link to='/' className='navbarLogo'>
                <img style={{width: 80, height: 60}} src={logo} alt = "carns logo" ></img>
            </Link>
            <ul>
                 <li classname ="active">
                    <a href='/' className="site-title">About</a>
                </li>
                <li classname ="active">
                    <a href='/' className="site-title">Rent</a>
                </li>
                <li classname ="active">
                    <a href='/' className="site-title">Buy</a>
                </li>

            </ul>
            <Button className ="btn"
            style={{
                borderRadius: 40,
                backgroundColor: "#e87123",
                padding: "8px 30px",
                fontSize: "18px",
                color: "#fff",
                marginLeft: "auto",
                marginRight:"50px"
            }}
            variant="contained" 
            disableElevation 
            href="/signup"> 
            Sign Up
            </Button>
            </div>
        </nav>
    );
}
export default Navbar
