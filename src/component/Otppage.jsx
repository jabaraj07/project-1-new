import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";
import './Otppage.css'

const Otppage = () => {
   let nav = useNavigate()
  let context = useContext(ProductContext);
  let currentdate = new Date();
  let date = currentdate.getDate();
  let month = currentdate.getMonth() + 1;
  let year = currentdate.getFullYear();

  const [otpvalue, setotpvalue] = useState('')
  const [randomvalue, setrandomvalue] = useState('')
  const [isable, setisable] = useState(true)

// useEffect(()=>{
//   context.setisotp(true)
//   if(context.isotp){
//     generateotp()
//   }
// },[context.isotp])

const handleotp = ()=>{
  generateotp()
}

const generateotp =()=>{
  let random = Math.floor(1000 + Math.random()*9000).toString()
  setrandomvalue(random)
  alert(`your otp is ${random}`)
}

const handleotpinput =(value)=>{
  setotpvalue(value)
}

useEffect(()=>{
  // if(otpvalue.split('').length === 4)
  if(String(otpvalue).length === 4)
    {
    setisable(false)
  }else{
    setisable(true)
  }
},[otpvalue])

  const handlepage = (value)=>{
    if(value == "cancel"){
        nav('/')
    }
   else if(value == "submit" && otpvalue ===randomvalue && otpvalue!==""){
        nav('/orderpage')
        context.setisotp(false)
        setisable(false)
    }
    else{
      alert('OTP is Invalid')
      generateotp()
      setotpvalue('')
    }
  }
  const [focus, setfocus] = useState(false)
  const handlefocus=()=>{
    setfocus(true)
  }
  const handleblur = (value)=>{
    if(!value){
      setfocus(false)
    }
  }
  return (
    <div className="opt-full-div">
      <div className="otp-content-div">
        <h2>OTP VERIFICATION</h2>

        <div style={{textAlign:"center",marginTop:10}}>
        <p>
          The One Time Password (OTP) has been sent to your Registered Mobile
          Number and E-Mail Id. Please use the OTP and authenticate the
          transaction
        </p>
        <h3 style={{marginTop:10}}>Total Amount:${context.total}</h3>
        <h5>Date:{date}/{month}/{year}</h5>
        </div>

        <div className="input-container1" >
          <input
            // style={{ width: 350, height: 30, borderRadius: 10 }}
            type="text"
            value={otpvalue}
            onChange={(e)=>handleotpinput(e.target.value)}
            required
            onFocus={()=>handlefocus()}
            onBlur={(e)=>handleblur(e.target.value)}
            maxLength={4}
          />
            <label className={focus ? 'activee' : ''} htmlFor="otp-input">Enter OTP</label>
        </div>
        <p style={{marginTop:20,textAlign:"center"}}>
          * Do not share your OTP with anyone, including bank staff, as they
          will never ask for it. OTPs are for your personal use only
        </p><br />
        <p style={{marginTop:15,textAlign:"center"}}>On Submitting Your OTP, an Amount of ${context.total} will be Debited from your Account.</p>

        <div className="otp-btn-div">
        <button disabled={isable} onClick={()=>handlepage("submit")}>Submit</button>
        <button onClick={()=>handlepage("cancel")}>Cancel</button>
        <button onClick={handleotp}>GENERATE OTP</button>
        </div>
        <p style={{justifyContent:"flex-start",width:"100%",textAlign:"center"}}>* Cancel Button will redirect you to the Home Page</p>
      </div>
    </div>
  );
};

export default Otppage;
