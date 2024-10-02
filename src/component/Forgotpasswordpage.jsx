import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Forgotpasswordpage = () => {
  const [verifyemail, setverifyemail] = useState("");
  const [resetpassword, setresetpassword] = useState('')
  const [state, setstate] = useState(1);
  const [message, setmessage] = useState('')
    let nav = useNavigate()

  
  const handlesubmit = (e) => {
    e.preventDefault();
    const userdetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userdetails.Useremail === verifyemail) {
      alert("Email Found");
      setstate(2)
      setmessage('')
    } else {
      setmessage("Email Not Found")
      setstate(1)
    }
  };

  const handlepasswordreset = (e)=>{
    e.preventDefault()
    const userdetail = JSON.parse(localStorage.getItem('userDetails'))
    if(userdetail){
        userdetail.Userpassword = resetpassword
        localStorage.setItem('userDetails',JSON.stringify(userdetail))
        setmessage('Password reset successfully')
        setTimeout(() => nav('/login'), 1500);
    }
  }
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      {
        state == 1 ? 
        <>
        <div style={{width:500,height:250,display:"flex",justifyContent:"center"}}>
        <form onSubmit={handlesubmit} className="Forgotpassword-form">
            <h1>Forgot Password</h1>
          {/* <label htmlFor="Email">Email</label> */}
          <input
            type="email"
            value={verifyemail}
            onChange={(e) => setverifyemail(e.target.value)}
            required
            placeholder="Enter Email"
          />
          <button type="submit">Verify</button>
          {message && <p style={{marginTop:10,color:"red",textAlign:"center"}}>{message}</p>}

        </form>         
        </div>
        </>
        :
        <>
        <form onSubmit={handlepasswordreset} className="Forgotpassword-form">
            <h1>Reset Password</h1>
            {/* <label htmlFor="Password">Enter Password</label> */}
            <input type="text" required placeholder="Enter Password" value={resetpassword} onChange={(e)=>setresetpassword(e.target.value)}/>
            <button type="submit">Submit</button>
            {message && <p style={{marginTop:10}}>{message}</p>}
        </form>
        </>

      }
    </div>
  );
};

export default Forgotpasswordpage;
