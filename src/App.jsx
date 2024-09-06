import { Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from '../components/Navbar'
import SignIn_SignUp from '../components/SignIn_SignUp';
import Home from '../Pages/Home';
import Register from '../Pages/Register';
import Help from '../Pages/Help';
import AboutUs from '../Pages/AboutUs';
import Manager from '../components/Manager';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Help' element={<Help />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/SignIn_SignUp' element={<SignIn_SignUp />} />
        <Route path='/Manager' element={<Manager />} />
      </Routes>
    </>
  )
}

export default App
