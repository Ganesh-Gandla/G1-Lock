import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav>
                <ul>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/Help'>Help</NavLink>
                    <NavLink to='/AboutUs'>About US</NavLink>
                </ul>
            </nav>
        </>
    )
}

export default Navbar