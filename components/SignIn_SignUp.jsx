import React, { useState } from "react";
import axios from "axios";





const SignIn_SignUp = () => {

    const [Sign, setSign] = useState("Sign In");
    const [Name, setName] = useState();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();

    event.preventDefault()

    const handleSignUp = (e) => {
        axios.post('http://localhost:5000/register', {"Name":Name, "userName":userName, "password":password})
        .then(result => console.log(result))
        .catch(err => console.log(err))
        console.log({"Name":Name, "userName":userName, "password":password})
    }

    const handleSignIn = (e) => {
        axios.post('http://localhost:5000/SignIn', {"userName":userName, "password":password})
        .then(result => console.log(result))
        .catch(err => console.log(err))
        console.log({"userName":userName, "password":password})
    }

    // {
    //     "Name": "name",
    //     "userName": "test@example.com4",
    //     "password": "securepass"
    //   }
      
    //   {
    //     "userName": "test@example.com4",
    //     "password": "securepass"
    //   }
    

    return (
        <>
            <form>
                <div className="container">
                    <h1>{Sign}</h1>
                    {Sign === "Sign In" ? <></>:<input type="text" name="Name" placeholder="Please Enter your Name" onChange={(e) => setName(e.target.value)}/>}
                    
                    <input type="text" name="Email" placeholder="Please Enter your Email" onChange={(e) => setUserName(e.target.value)}/>
                    <input type="password" name="Password" placeholder="Please Enter your Password" onChange={(e) => setPassword(e.target.value)}/>

                    {Sign === "Sign In" ? 
                    //If true Sign In page
                    <>
                    <div className="ForgotSignUP">
                        <a href="">Forgot Password ?</a>
                        <p>Create new account by <span><a onClick={() => {setSign("Sign Up")}} href="">Sign Up</a></span></p>
                    </div>
                    <button onClick={handleSignIn} type="button">Sign In</button>
                    </> : 
                    // If false Sing Up page
                    <>
                    <p>Already have an account? <span><a onClick={() => {setSign("Sign In")}} href="">Sign In</a></span></p>
                    <button onClick={handleSignUp} type="button">Sign Up</button>
                    </>}
                    
                </div>
            </form>
        </>
    )
}

export default SignIn_SignUp