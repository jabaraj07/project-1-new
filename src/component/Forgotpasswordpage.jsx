import React, { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import { ProductContext } from "../App";

const Forgotpasswordpage = () => {
  const [verifyemail, setverifyemail] = useState("");
  const [resetpassword, setresetpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const [iscolor, setiscolor] = useState(false)
  const [state, setstate] = useState(1);
  const [message, setmessage] = useState('')
    let nav = useNavigate()
let context=useContext(ProductContext)
  
  const handlesubmit = (e) => {
    e.preventDefault();
    const userdetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userdetails.Useremail === verifyemail) {
      alert("Email Verified Successfully");
      setstate(2)
      setmessage('')
    } else {
      setmessage("Email Not Found")
      setstate(1)
    }
  };

  const handlepasswordreset = async(e)=>{
    e.preventDefault()
    const userdetail = JSON.parse(localStorage.getItem('userDetails'))
    const hashpassword = await context.hashpasswordwithsalt(resetpassword,userdetail.salt)    

    if(userdetail){

      if(confirmpassword === resetpassword){
        userdetail.Userpassword = hashpassword
        localStorage.setItem('userDetails',JSON.stringify(userdetail))
        setmessage('Password reset successfully')
        setiscolor(true)
        setTimeout(() => nav('/login'), 1500);
      }else{
        setmessage("Password Not Match")
        setiscolor(false)
        setTimeout(() => {
          setmessage('')
        }, 2000);
      }

    }
  }
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      {
        state == 1 ? 
        <>
        <div style={{width:500,height:280,display:"flex",justifyContent:"center"}}>
        <form onSubmit={handlesubmit} className="Forgotpassword-form">
            <h1>Forgot Password</h1>
          {/* <label htmlFor="Email">Email</label> */}
          <input
            type="email"
            value={verifyemail}
            onChange={(e) => setverifyemail(e.target.value)}
            required
            onFocus={()=>setmessage('')}
            placeholder="Enter Email"
          />
          <button type="submit">Verify</button>
          {message && <p style={{marginTop:10,color:"red",textAlign:"center"}}>{message}</p>}
          <div style={{textAlign:"center",padding:15,fontSize:17}}>
          <p> <Link style={{textDecoration:"none"}} to={'/signup'}>Signup</Link> OR <span> <Link style={{textDecoration:"none"}} to={'/login'}>Login</Link> </span></p>
          </div>
        </form>         
        </div>
        </>
        :
        <>
        <form onSubmit={handlepasswordreset} className="Forgotpassword-form1">
            <h1>Reset Password</h1>
            <input style={{marginTop:10}} type="text" required placeholder="Enter Password" value={resetpassword} onChange={(e)=>setresetpassword(e.target.value)}/>
            <input style={{marginTop:10}} type="password" required placeholder="Enter Confirm Password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)}/>
            <button style={{marginTop:10}} type="submit">Submit</button>
            {message && <p className={iscolor ? `${'greenclass'}` : `${'redclass'}`} >{message}</p>}
        </form>
        </>
// style={{marginTop:10,textAlign:"center",fontSize:"17px",color:"red" }}
      }
    </div>
  );
};

export default Forgotpasswordpage;
