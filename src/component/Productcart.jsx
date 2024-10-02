import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../App";

const Productcart = ({nav1}) => {
  const nav = useNavigate()
  let context = useContext(ProductContext);
  // const [total, settotal] = useState(0);
  const handleremove = (indx) => {
    context.setcart((pre) => pre.filter((item, index) => index !== indx));
  };

  useEffect(() => {
    let newtotal = context.cart.reduce(
      (initial, item) => initial + (item.price * item.quantity),
      0
    );
    context.settotal(newtotal.toFixed(2));
  }, [context.cart]);

  const handleclear = () => {
    context.setcart([]);
    // settotal((0).toFixed(2))
  };

  const shorttitle = (title,wordlimit)=>{
    const words = title.split('')
    if(words.length > wordlimit){
      return words.slice(0,wordlimit).join('')+'...'
    }else{
      return words
    }
  }

  const Handledecrease = (item)=>{
    context.setcart((pre)=>{
            
      if(item.quantity >1 ){
        return pre.map((product)=>
          product.id === item.id ? {...product,quantity:product.quantity-1}:product
        )
      }else {
        return pre.filter((filteritem)=>filteritem.id !== item.id)
      }
    })
  }

  const Handleincrease = (item)=>{
    context.setcart((pre)=>{
      const proindx = pre.find(product =>product.id === item.id) // [{rg},{}]
      
      if(proindx){
        return pre.map((product)=>
          product.id === item.id ? {...product,quantity : product.quantity+1}:product
        )
      }
      else{
        return [...pre , {...item,quantity:1}]
      }
    })
   }

   const handlehomepage = ()=>{
    nav ('/')
   }
   const handlepaymentpage = () => {
    nav('/payment')
   }

  const btnDisable = context.cart.length > 0;
  return (
      <>
      {nav1}
          <div>
      <div className="cart-full-div">

        <button disabled={!btnDisable} onClick={handleclear}>
          CLEAR CART
        </button>
        <h4>Total : ${context.total}</h4>
        <button disabled={!btnDisable} onClick={handlepaymentpage}>PROCEED PAY</button>
      </div>

      <div className="cart-product-div">
        {context.cart.length > 0 ? 
        (
          <>
            {context.cart.map((item, indx) => {
              return (
                <div key={indx} className="cart-content-div">
                  <h5 className="cart-content-title">{shorttitle(item.title,40)}</h5>
                  <img src={item.image} />
                  <h5>PRICE : ${item.price}</h5>
                  <h5>RATING : {item.rating.rate}</h5>
                  <h5>IN STOCK : {item.rating.count}</h5>
                  <h5>Quantity : {item.quantity}</h5>
                  <button onClick={() => handleremove(indx)}>REMOVE</button>
                  <button style={{marginLeft:10,marginRight:10}} onClick={() => Handleincrease(item)}>➕</button>
                  <button onClick={() => Handledecrease(item)}>➖</button>
                </div>
              );
            })}
          </>
        ) 
        : 
        (
          <>
          <div className="cart-empty-div">
            <div className="cart-empty-div-content">
            <h2>Your Cart Is Empty</h2>
            <h3 className="cart-to-home" onClick={handlehomepage}>Click Here To Add</h3>
            </div>

          </div>
          </>
        )}
        
      </div>
    </div>
      </>
  );
};

export default Productcart;
