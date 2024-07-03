import { useEffect, useState } from 'react'
import './App.css'
import Navbar from '../components/Navbar'

function App() {
  const [form, setForm] = useState({ Site: "", UserName: "", Password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords))
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const savePassword = () => {
    setPasswordArray([...passwordArray, form])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]))
    { console.log([...passwordArray, form]) }

  }

  return (
    <>
      <Navbar />
      <div className="password-generator">
        <div className="site">
          <input type="text" placeholder='Enter the site' name="Site" onChange={handleChange} />
        </div>
        <div className='userPass'>
          <input type="text" placeholder='Enter the User Name' name="UserName" onChange={handleChange} />
          <div className="password">
            <input type="text" placeholder='Enter the Password' name="Password" onChange={handleChange} />
            <span className='showpassword'><img src="./icons/eye.png" alt="" /></span>
          </div>
        </div>
        <button onClick={savePassword}>Save Password</button>

      </div>
      <h2>Your Passwords</h2>
      <table>
        <thead>
          <tr>
            <th>Site</th>
            <th>User Name</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {passwordArray.map((item) => {
            return <tr>
              <td>{item.Site}</td>
              <td>{item.UserName}</td>
              <td>{item.Password}</td>
            </tr>
          })}
        </tbody>
      </table>

    </>
  )
}

export default App
