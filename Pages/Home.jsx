import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="home">
                <h1>Wellcome to G1-Lock</h1>
                <h3>Your Password Manager</h3>
                <Link to='/SignIn_SignUp'> <button>Sign In</button> </Link>
            </div>

        </>
    )
}

export default Home