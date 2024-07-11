import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from '../components/Navbar'

function App() {
  const [form, setForm] = useState({ Site: "", UserName: "", Password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [showBtn, setShowBtn] = useState(false)
  const [showIcon, setShowIcon] = useState("./icons/eye.png")
  const copyIcon = () => {<img src='./icons/copy.png'></img>} 

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
    if(form.Site.length > 3 && form.UserName.length > 3 && form.Password.length > 3){
      setPasswordArray([...passwordArray, {...form, id:uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
      setForm({ Site: "", UserName: "", Password: "" });
    } else {
      alert('Please enter valid details')
    }
    
  }
  const handleShowPassowd = () => {
    setShowBtn (!showBtn);
    setShowIcon(showBtn? "./icons/eye.png" : "./icons/hidden.png")
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
  }

  const HandleEdit = (id) => {
    setForm(passwordArray.filter((i)=> i.id === id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));

  }

  const HandleDelete = (id) => {
    let c = confirm('Are you sure you want to delete ?')
    if(c){
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item) => item.id !== id)))
    } 
  }

  return (
    <>
      <Navbar />
      <div className="password-generator">
        <div className="site">
          <input type="text" value= {form.Site} placeholder='Enter the site' name="Site" onChange={handleChange} />
        </div>
        <div className='userPass'>
          <input type="text" value= {form.UserName} placeholder='Enter the User Name' name="UserName" onChange={handleChange} />
          <div className="password">
            <input type="text" value={form.Password} placeholder='Enter the Password' name="Password" onChange={handleChange} />
            <span className='showpassword'><img src={showIcon} alt="" onClick={handleShowPassowd}/></span>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {passwordArray.map((item, index) => {
            return <tr key={index}>
              <td>{item.Site} <img src='./icons/copy.png' onClick={()=>{copyText(item.Site)}}></img> </td>
              <td>{item.UserName} <img src='./icons/copy.png' onClick={()=>{copyText(item.UserName)}}></img></td>
              <td>{item.Password}<img src='./icons/copy.png' onClick={()=>{copyText(item.Password)}}></img></td>
              <td>
                <div className='actions'>
                <div className='edit' onClick={()=>{HandleEdit(item.id)}}>
                  Edit<img src='./icons/pencil.png' ></img>
                </div>
                <div className='delete' onClick={()=>{HandleDelete(item.id)}}>
                  Delete<img src='./icons/delete.png' ></img>
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

export default App
