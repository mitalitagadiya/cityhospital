import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { themeContext } from '../../Context/ThemeContext';

function Header(props) {

    const value = useContext(themeContext);

    console.log(value);


    return (
        <div className="main-header">
            <div id="topbar" className="d-flex align-items-center fixed-top">
                <div className="container d-flex justify-content-between">
                    <div className="contact-info d-flex align-items-center">
                        <i className="bi bi-envelope" /> <a href="mailto:contact@example.com">cityhospital@example.com</a>
                        <i className="bi bi-phone" /> +91 9988776655
                    </div>
                    <div className="d-none d-lg-flex social-links align-items-center">
                        <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                    <button onClick={() => value.toggle_theme(value.theme)}>
                        Change Theme
                    </button>
                </div>
            </div>
            <header id="header" className={`fixed-top ${value.theme}`}>
                <div className="container d-flex align-items-center">
                    <div className="logo">
                        <a href="index.html">
                            <h1 className="logo me-auto">City</h1><br />
                            <h2 className="logo-tiny-text me-auto">Multispeciality Hospital</h2>
                        </a>
                    </div>
                    <nav id="navbar" className="navbar order-last order-lg-0">
                        <ul>
                            <li>
                                    <NavLink className="nav-link scrollto active" to={"/"}>Home</NavLink>               
                            </li>
                            <li>
                                    <NavLink className="nav-link scrollto" to={"/departments"}>departments</NavLink>               
                            </li>
                            <li>
                                    <NavLink className="nav-link scrollto" to={"/doctors"}>doctors</NavLink>               
                            </li>
                            <li>
                                    <NavLink className="nav-link scrollto" to={"/about"}>about</NavLink>               
                            </li>
                            <li>
                                    <NavLink className="nav-link scrollto" to={"/contact"}>contact</NavLink>               
                            </li>
                            <li>
                                    <NavLink className="nav-link scrollto" to={"/Medicines"}>Medicines</NavLink>
                            </li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>
                    <NavLink className="appointment-btn scrollto" to={"/BookAppointment"}><span className="d-none d-md-inline"></span>Make an Appointment</NavLink>
                    
                    <NavLink className="appointment-btn scrollto" to="/login_signup">
                                 <span>Login/ Signup</span>
                    </NavLink>
                    <Link className="appointment-btn scrollto" to={"/refexample"}>Refexample</Link> 

                </div>
            </header>
        </div>
    );
}

export default Header;

