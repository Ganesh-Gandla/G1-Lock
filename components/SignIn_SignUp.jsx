import React, { useState } from "react";
import axios from "axios";
import { useNavigate, } from "react-router-dom";


const SignIn_SignUp = () => {

    const [Sign, setSign] = useState("Sign In");
    const [Name, setName] = useState();
    const [registeredEmail, setregisteredEmail] = useState();
    const [password, setPassword] = useState();

    const Navigate = useNavigate();


    event.preventDefault()

    const handleSignUp = (e) => {
        axios.post('http://localhost:5000/register', { "Name": Name, "registeredEmail": registeredEmail, "password": password })
            .then(result => {
                console.log(result)
                setSign("Sign In")
            })
            .catch(err => console.log(err))
        console.log({ "Name": Name, "registeredEmail": registeredEmail, "password": password })
    }

    // const handleSignIn = (e) => {
    //     axios.post('http://localhost:5000/SignIn', {"registeredEmail":registeredEmail, "password":password})
    //     .then(result => console.log(result))
    //     .catch(err => console.log(err))
    //     console.log({ "registeredEmail": registeredEmail, "password": password })
    //     Navigate('/Manager')
    // }

    const handleSignIn = (e) => {

        const loginData = { "registeredEmail": registeredEmail, "password": password };

        fetch('http://localhost:5000/SignIn', {
            method: 'POST', headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(loginData),
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(result.registeredId);

                    Navigate('/Manager', { state: { registeredId: result.registeredId } });
                } else {
                    alert('Login failed: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
            });
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
                    {Sign === "Sign In" ? <></> : <input type="text" name="Name" placeholder="Please Enter your Name" onChange={(e) => setName(e.target.value)} />}

                    <input type="text" name="Email" placeholder="Please Enter your Email" onChange={(e) => setregisteredEmail(e.target.value)} />
                    <input type="password" name="Password" placeholder="Please Enter your Password" onChange={(e) => setPassword(e.target.value)} />

                    {Sign === "Sign In" ?
                        //If true Sign In page
                        <>
                            <div className="ForgotSignUP">
                                <a href="">Forgot Password ?</a>
                                <p>Create new account by <span><a onClick={() => { setSign("Sign Up") }} href="">Sign Up</a></span></p>
                            </div>
                            <button onClick={handleSignIn} type="button">Sign In</button>
                        </> :
                        // If false Sing Up page
                        <>
                            <p>Already have an account? <span><a onClick={() => { setSign("Sign In") }} href="">Sign In</a></span></p>
                            <button onClick={handleSignUp} type="button">Sign Up</button>
                        </>}

                </div>
            </form>
        </>
    )
}

export default SignIn_SignUp