import React from "react";
import axios from "axios";
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const location = useLocation();
    const registeredId = location.state?.registeredId;

    const [form, setForm] = useState({ siteURL: "", siteUserId: "", sitePassword: "", registeredId })
    const [passwordArray, setPasswordArray] = useState([])
    const [btn, setBtn] = useState("Save Passwords")
    const [editId, setEditId] = useState()

    const PasswordRef = useRef()
    const ref = useRef()


    const copyIcon = './icons/copy.png'

    // useEffect(() => {
    //     let passwords = localStorage.getItem("passwords");
    //     if (passwords) {
    //         setPasswordArray(JSON.parse(passwords))
    //     }
    // }, [])

    useEffect(() => {
        // Fetch passwords from the backend
        axios.get(`http://localhost:5000/passwords/${registeredId}`)
            .then(response => {
                setPasswordArray(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [registeredId]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value, registeredId })
    }

    const handleShowPassowd = () => {

        if (ref.current.src.includes("icons/hidden.png")) {
            PasswordRef.current.type = "password";
            ref.current.src = "icons/eye.png";
        } else {
            PasswordRef.current.type = "text";
            ref.current.src = "icons/hidden.png";
        }
        // ref.current.src.includes("icons/hidden.png"? (PasswordRef.current.type = "text") (ref.current.src = "icons/hidden.png") : (PasswordRef.current.type = "password") (ref.current.src = "icons/eye.png") (alert("false")) )
    }

    // const savePassword = () => {
    //     if (form.Site.length > 3 && form.UserName.length > 3 && form.Password.length > 3) {
    //         setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
    //         localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
    //         setForm({ Site: "", UserName: "", Password: "" });
    //     } else {
    //         alert('Please enter valid details')
    //     }

    // }

    const savePassword = () => {
        if (form.siteURL.length > 3 && form.siteUserId.length > 3 && form.sitePassword.length > 3) {
            setPasswordArray([...passwordArray, { ...form }])
            console.log(form)
            console.log(passwordArray)
            // Post request for save passwords
            axios.post("http://localhost:5000/savePasswords", form, { headers: { 'Content-Type': 'application/json', } })
                .then(result => console.log(result))
                .catch(err => console.log(err))

            setForm({ siteURL: "", siteUserId: "", sitePassword: "" });
        } else {
            alert('Please enter valid details')
        }

    }

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const HandleEdit = (id) => {
        setEditId(id);
        setBtn("Save Changes");
        setForm(passwordArray.filter((i) => i._id === id)[0]);
        setPasswordArray(passwordArray.filter((item) => item._id !== id));
    }

    const saveChanges = () => {
        if (form.siteURL.length > 3 && form.siteUserId.length > 3 && form.sitePassword.length > 3) {
            axios.put(`http://localhost:5000/edit/${editId}`, form,)
                .then(result => console.log(result))
                .catch(err => console.log(err))
            setPasswordArray([...passwordArray, { ...form }]);
            setForm({ siteURL: "", siteUserId: "", sitePassword: "" });

        } else {
            alert("Please enter valid details")
        }
    }

    const HandleDelete = (id) => {
        console.log(id)
        let c = confirm('Are you sure you want to delete ?')
        if (c) {
            setPasswordArray(passwordArray.filter((item) => item._id !== id));

            axios.delete(`http://localhost:5000/delete/${id}`)
                .then(response => {
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }


    return (
        <>
            <div className="password-generator">
                <div className="site">
                    <input type="text" value={form.siteURL} placeholder='Enter the site' name="siteURL" onChange={handleChange} />
                </div>
                <div className='userPass'>
                    <input type="text" value={form.siteUserId} placeholder='Enter the User Name' name="siteUserId" onChange={handleChange} />
                    <div className="password">
                        <input ref={PasswordRef} type="password" value={form.sitePassword} placeholder='Enter the Password' name="sitePassword" onChange={handleChange} />
                        <span className='showpassword'><img ref={ref} src="icons/eye.png" alt="" onClick={handleShowPassowd} /></span>
                    </div>
                </div>
                <button onClick={btn === "Save Password" ? savePassword : saveChanges}>{btn}</button>

            </div>

            <h2>Your Passwords</h2>

            <table>
                <thead>
                    <tr>
                        <th>Site</th>
                        <th>User Name</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {passwordArray.map((item, index) => {
                        return <tr key={index}>
                            <td>{item.siteURL} <img src={copyIcon} onClick={() => { copyText(item.siteURL) }}></img> </td>
                            <td>{item.siteUserId} <img src={copyIcon} onClick={() => { copyText(item.siteUserId) }}></img></td>
                            <td>{item.sitePassword}<img src={copyIcon} onClick={() => { copyText(item.sitePassword) }}></img></td>
                            <td>
                                <div className='actions'>
                                    <div className='edit' onClick={() => { HandleEdit(item._id) }}>
                                        <p>Edit</p>
                                        <img src='./icons/pencil.png' ></img>
                                    </div>
                                    <div className='delete' onClick={() => { HandleDelete(item._id) }}>
                                        <p>Delete</p>
                                        <img src='./icons/delete.png' ></img>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>



        </>
    )

}

export default Manager