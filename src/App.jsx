import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './component/Navbar'
import Homepage from './component/Homepage'
import Menspage from './component/Menspage'
import Productcart from './component/Productcart'
import Womenspage from './component/Womenspage'
import Electronicspage from './component/Electronicspage'
import Jewelerypage from './component/Jewelerypage'
import Paymentpage from './component/Paymentpage'
import Otppage from './component/Otppage'
import Order from './component/Order'
import Signuppage from './component/Signuppage'
import Loginpage from './component/Loginpage'
import Forgotpasswordpage from './component/Forgotpasswordpage'
import './App.css'

export let ProductContext = createContext()

const App = () => {
    const [data, setdata] = useState([])
    const [cart, setcart] = useState([])
    const [total, settotal] = useState(0);
    const [isotp, setisotp] = useState(false)
    const [islogin, setislogin] = useState(false)
    useEffect(()=>{
        const fetchdata = async ()=>{
            try {
                let response = await axios.get("https://fakestoreapi.com/products")
                setdata(response.data)
            } catch (error) {
                console.log(error);  
            }
        }
        fetchdata()
    },[])

    // useEffect(()=>{
    //     const loggedin = localStorage.getItem('loggedin')
    //     setislogin(loggedin === "true")
    // },[])

    const handlelogin =()=>{
        setislogin(true)
    }

    const handleLogout = ()=>{
        localStorage.removeItem('loggedin')
        setislogin(false)
        setcart([])
    }

    const hashpasswordwithsalt= async(password,salt)=>{
        const encoder = new TextEncoder();
        const data = encoder.encode(password+salt)
        const hash = await window.crypto.subtle.digest("SHA-256",data)
        return Array.from(new Uint8Array(hash))
        .map((byte)=>byte.toString(16).padStart(2,'0'))
        .join('')
      }
      
      const generateSalt=()=>{
        return Array.from(window.crypto.getRandomValues(new Uint8Array(16)))
        .map((byte)=>byte.toString(16).padStart(2,'0'))
        .join("")
      }
  return (
    <ProductContext.Provider value={{data,setdata,cart,setcart,total,settotal,isotp,setisotp,islogin,setislogin,handleLogout,handlelogin,generateSalt,hashpasswordwithsalt}}>
        <BrowserRouter>
        {/* <Navbarapp2 islogin={islogin} onLogout={handleLogout}/> */}
        <Routes>
          
            <Route path='/' element={ islogin ? <Homepage nav={<Navbar/>} /> : <Navigate to="/login"/>}/>
            <Route path='/mens' element={islogin ?<Menspage  nav={<Navbar/>}/> : <Navigate to="/login"/>}/>
            <Route path='/cart' element={islogin ? <Productcart nav1={<Navbar/>} />: <Navigate to="/login"/>}/>
            <Route path='/womens' element={islogin ? <Womenspage nav={<Navbar/>} /> : <Navigate to="/login"/>}/>
            <Route path='/electronics' element={islogin ? <Electronicspage nav={<Navbar/>}/>: <Navigate to="/login"/>}/>
            <Route path='/jewelery' element={islogin ? <Jewelerypage nav={<Navbar/>}/>: <Navigate to="/login"/>}/>
            <Route path='/payment' element={islogin ?<Paymentpage/>:<Navigate to="/login"/>}/>
            <Route path='/otp' element={islogin ?<Otppage/>:<Navigate to="/login"/>}/>
            <Route path='/orderpage' element={islogin ?<Order/>:<Navigate to="/login"/>}/>
            <Route path='/signup' element={islogin ?<Navigate to="/"/>: <Signuppage nav1={<Navbar/>}/>}/>
            <Route path='/login' element={islogin ? <Navigate to="/"/>:<Loginpage />}/>
            <Route path='/ForgotPassword' element={islogin ? <Navigate to="/"/>:<Forgotpasswordpage />}/>
        </Routes>
        </BrowserRouter>
    </ProductContext.Provider>
  )
}

export default App