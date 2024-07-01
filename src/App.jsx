import { useState } from 'react'
import './App.css'
import Navbar from '../components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  const handleChange = (e) => {

  }

  return (
    <>
     <Navbar/>
     <div className="password-generator">
      <input type="text" placeholder='Enter the site' onChange={e => handleChange(e)}/>
      <input type="text" placeholder='Enter the User Name' onChange={e => handleChange(e)}/>
      <input type="text" placeholder='Enter the Password' onChange={e => handleChange(e)}/>
      <button>Save Password</button>
     </div>
    </>
  )
}

export default App
