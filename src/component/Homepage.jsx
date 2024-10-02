import React, { useContext } from 'react'
import { ProductContext } from '../App'
import Navbar from './Navbar'

const Homepage = ({nav}) => {
   let context1 =  useContext(ProductContext)
   const handleadd = (item)=>{
    context1.setcart((pre)=>{
      const proindx = pre.find(product =>product.id === item.id)      
      if(proindx ){
        return pre.map((product)=>
          product.id === item.id ? {...product,quantity : product.quantity+1} : product
        )
      }
      else{
        return [...pre , {...item,quantity:1}]
      }
    })
   }
  return (
    <>
    {/* <Navbar/> */}
    {nav}
        <div className="Product-full-div">
        {
          context1.data.map((item,indx)=>{
            return(
                <div key={indx}  className="product-content-div">
                    <h5 className='product-content-title'>{item.title}</h5>
                    <img src={item.image} width={150}height={150}/>
                    <h5>PRICE : ${item.price}</h5>
                    <h5>RATING : {item.rating.rate}</h5>
                    <h5>IN STOCK : {item.rating.count}</h5>
                    <button onClick={()=>handleadd(item)}>ADD CART</button>
                </div>
            )
          })  
        
        }
    </div>
    </>

  )
}

export default Homepage