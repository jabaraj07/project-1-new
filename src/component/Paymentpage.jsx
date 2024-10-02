import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";
import './Payment.css'
const Paymentpage = () => {
  let nav = useNavigate();
  let context = useContext(ProductContext);
  const [cardholdername, setcardholdername] = useState("");
  const [cardnumber, setcardnumber] = useState("");
  const [expirymonth, setexpirymonth] = useState("");
  const [expiryyear, setexpiryyear] = useState("");
  const [cvvnumber, setcvvnumber] = useState("");
  const [error, seterror] = useState("");

  const handlesubmit = (event) => {
    event.preventDefault();

    const currentdate = new Date();
    const currentmonth = String(currentdate.getMonth() + 1).padStart(2, "0");
    const currentyear = String(currentdate.getFullYear());

    if (
      (expiryyear === currentyear && expirymonth < currentmonth) ||
      expiryyear < currentyear
    ) {
      seterror("Expiry month & year must be current or in the future.");
      return;
    }
    if (!/^\d{16}$/.test(cardnumber)) {
      seterror("cardnumber must be 16 numbers");
      return;
    }
    if (!/^\d{3}$/.test(cvvnumber)) {
      seterror("CVV number must be 3 numbers");
      return;
    }
    if (expirymonth < 1 || expirymonth > 12) {
      seterror("Month Should be 01 to 12 only");
      return;
    }

    seterror("")
    setcardholdername('')
    setcardnumber('')
    setexpirymonth('')
    setexpiryyear('')
    setcvvnumber('')
    // context.setcart([])
  };
  const handletohome = () => {
    const currentdate = new Date();
    const currentmonth = String(currentdate.getMonth() + 1).padStart(2, "0");
    const currentyear = String(currentdate.getFullYear());
    if (
      /^\d{3}$/.test(cvvnumber) &&
      /^\d{16}$/.test(cardnumber) &&
      ((expiryyear === currentyear && expirymonth >= currentmonth) ||
        expiryyear > currentyear)
    ) {
      nav("/otp");
    //   context.setisotp(true)
    }
  };

  const handlenumber = (category, value) => {
    switch (category) {
      case "cvv":
        if (/^\d{0,3}$/.test(value)) {
          setcvvnumber(value);
        }
        break;
      case "number":
        if (/^\d{0,16}$/.test(value)) {
          setcardnumber(value);
        }
        break;
      case "month":
        if (/^\d{0,2}$/.test(value)) {
          setexpirymonth(value);
        }
        break;
      case "year":
        if (/^\d{0,4}$/.test(value)) {
          setexpiryyear(value);
        }
        break;
    }
  };
const [focusinput, setfocusinput] = useState({})

  const handlefocus = (inputName)=>{
    setfocusinput((pre)=>({...pre,[inputName]:true}))
  }
  const handleblur = (inputname,value)=>{
    if(!value){
      setfocusinput((pre)=>({...pre,[inputname]:false}))
    }
  }
  return (
    <div className="payment-full-div">
      <div className="payment-content-div">
        <h2 className="payment-content-heading">Credit/Debit Card payment</h2>

        <div className="payment-content-form-div">
          <form onSubmit={handlesubmit}>

            <div className="content"> 

              <div className="input-container">
              <label className={focusinput['Name'] ? 'active':''} htmlFor="cardholdername">Card HolderName  </label>
              <input
              type="text"
              value={cardholdername}
              onChange={(e) => setcardholdername(e.target.value)}
              id="cardholdername"
              required
              // placeholder="Enter Name"
              onFocus={()=>handlefocus('Name')}
              onBlur={(e)=>handleblur('Name',e.target.value)}
            />
              </div>

              <div className="input-container">
              <label className={focusinput['Number'] ? 'active':''} htmlFor="cardholdernumber">Card Number  </label>
              <input
              type="number"
              value={cardnumber}
              onChange={(e) => handlenumber("number", e.target.value)}
              id="cardholdernumber"
              // placeholder="Enter Name"
              onFocus={()=>handlefocus('Number')}
              onBlur={(e)=>handleblur('Number',e.target.value)}
              required
            />
              </div>

            <div className="select-div">
            <select
              // style={{ width: 350, height: 150 }}
              value={expirymonth}
              required
              onChange={(e) => setexpirymonth(e.target.value)}
              id="cardexpmonth"
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
              ))}
            </select>    
            </div>  

            <div className="input-container">
            <label className={focusinput['Year'] ? 'active':''} htmlFor="cardexpYear">Expiry Year </label>
            <input
              type="number"
              value={expiryyear}
              onChange={(e) => handlenumber("year", e.target.value)}
              id="cardexpYear"
              // placeholder="Enter Year"
              onFocus={()=>handlefocus('Year')}
              onBlur={(e)=>handleblur('Year',e.target.value)}
              required
            />
            </div>

            <div className="input-container">
            <label className={focusinput['Card'] ? 'active':''} htmlFor="cardCvv"> CVV </label>
            <input
              type="number"
              value={cvvnumber}
              onChange={(e) => handlenumber("cvv", e.target.value)}
              id="cardCvv"
              // placeholder="Enter CVV"
              onFocus={()=>handlefocus('Card')}
              onBlur={(e)=>handleblur('Card',e.target.value)}
              required
            />
            </div>
            
            <h3 style={{padding:10,fontSize:20,color:"red"}}>{error}</h3>
            <button onClick={handletohome} style={{width:"100%",padding:20}}>
              Pay : ${context.total}
            </button>
            </div>


            {/* <div className="input-container">
            <input
              type="text"
              value={cardholdername}
              onChange={(e) => setcardholdername(e.target.value)}
              id="cardholdername"
              required
              // placeholder="Enter Name"
              onFocus={()=>handlefocus('Name')}
              onBlur={(e)=>handleblur('Name',e.target.value)}
            />
            <label className={focusinput['Name'] ? 'active':''} htmlFor="cardholdername">Card HolderName  </label>

            </div> */}
{/* 
            <div className="input-container">
            <input
              type="number"
              value={cardnumber}
              onChange={(e) => handlenumber("number", e.target.value)}
              id="cardholdernumber"
              onFocus={()=>handlefocus('Number')}
              onBlur={(e)=>handleblur('Number',e.target.value)}
              required
            />
            <label className={focusinput['Number'] ? 'active':''} htmlFor="cardholdernumber">Card Number  </label>
            </div> */}


            {/* <label htmlFor="cardexpmonth">Expiry Month : </label>
            <input type="number" value={expirymonth} onChange={(e)=>handlenumber("month",e.target.value)} id='cardexpmonth' required placeholder='Enter Month'/> */}
            {/* <label htmlFor="cardexpmonth">Expiry Month : </label> */}

            {/* <div className="select-div">
            <select
              // style={{ width: 350, height: 150 }}
              value={expirymonth}
              required
              onChange={(e) => setexpirymonth(e.target.value)}
              id="cardexpmonth"
            >
              <option value="">Select Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1}>{String(i + 1).padStart(2, "0")}</option>
              ))}
            </select>    
            </div> */}

            {/* <div className="input-container">
            <input
              type="number"
              value={expiryyear}
              onChange={(e) => handlenumber("year", e.target.value)}
              id="cardexpYear"
              onFocus={()=>handlefocus('Year')}
              onBlur={(e)=>handleblur('Year',e.target.value)}
              required
            />
            <label className={focusinput['Year'] ? 'active':''} htmlFor="cardexpYear">Expiry Year </label>
            </div> */}

            {/* <div className="input-container">
            <input
              type="number"
              value={cvvnumber}
              onChange={(e) => handlenumber("cvv", e.target.value)}
              id="cardCvv"
              onFocus={()=>handlefocus('Card')}
              onBlur={(e)=>handleblur('Card',e.target.value)}
              required
            />
            <label className={focusinput['Card'] ? 'active':''} htmlFor="cardCvv"> CVV </label>
            </div> */}


            {/* <h3 style={{padding:10,fontSize:20,color:"red"}}>{error}</h3>
            <button onClick={handletohome} className="payment-button">
              Pay : ${context.total}
            </button> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
