import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../App'
import './Order.css'

const StarRating = ({rating,onRate})=>{
    return(
        <div>
            {[...Array(5)].map((_,indx)=>(
                <span key={indx} onClick={()=>onRate(indx+1)} style={{cursor:"pointer",color:indx<rating ? "gold":"gray",fontSize:30}}>
                   ★  
                </span>
            ))}
        </div>
    )
}

const StarRating1 = ({rating,onRate})=>{
    return(
        <div>
            {[...Array(5)].map((_,indx)=>(
                <span key={indx} onClick={()=>onRate(indx+1)} style={{cursor:"pointer",color:indx<rating ? "gold":"gray",fontSize:30}}>
                   ★  
                </span>
            ))}
        </div>
    )
}

const Order = () => {
    let nav = useNavigate()
   let context = useContext(ProductContext)
    const [currentstatus, setcurrentstatus] = useState(0)
    const [feedbackvisible, setfeedbackvisible] = useState(false)
    const [rating, setrating] = useState(0)
    const [rating1, setrating1] = useState(0)
    // const [btndisable, setbtndisable] = useState(true)
    const [feedbackbtndisable, setfeedbackbtndisable] = useState(false)
    const [feedback, setfeedback] = useState('')
    const status = ["Order Placed", "Preparing", "Shipped", "Delivered"];

    useEffect(()=>{
    if(rating > 0 && rating1 >0){
        setfeedbackbtndisable(false)     
    }
  },[rating,rating1])

  const handlefeedback = (e)=>{
    e.preventDefault()
    setfeedback(`Thanks For Your Feedback.`)
    setfeedbackbtndisable(true)
  }

    useEffect(()=>{
        if(currentstatus < status.length-1){
            const interval = setInterval(()=>{
                setcurrentstatus(pre => pre+1)
            },2000)
            return ()=>clearInterval(interval)
        }else{
            setfeedbackvisible(true)
        }
    },[currentstatus,status.length])

    const handlegotohome = ()=>{
        nav('/')
        context.setcart([])
    }
  return (
    <div>
        <h1 style={{textAlign:'center'}}>Order status</h1>
        <div className='order-status' >
            {
                status.map((item,indx)=>{
                  return  (
                    <div className='order-status-content' key={indx} style={
                        {fontWeight:indx ===currentstatus ? "bold" : "normal",
                            color:indx === currentstatus ? "blue" :"black",
                            opacity:indx === currentstatus ? 1 : 0.5,
                            transition:'opacity 0.5s ease-in-out'
                        }
                        }>
                        {item}
                    </div>
                  )                   
                })
            }
        </div>
        {feedbackvisible && !feedbackbtndisable &&(
            <form onSubmit={handlefeedback} className='feedback-form' >
                <h3>Product Delivered Successfully</h3>
                <h4 style={{textAlign:"center"}}>Your Ratings make us improve our Product quality and delivery service</h4>
                <div className='feedback-form-content' >
                    <h1>Product Rating</h1>
                    <StarRating rating={rating} onRate={setrating} />
                    <h1>Delivery Rating</h1>
                    <StarRating1 rating={rating1} onRate={setrating1}/>
                    <div style={{display:"flex",marginTop:10}}>
                    <button style={{width:150,marginRight:10}} type='submit' disabled={!(rating > 0 && rating1 > 0)}>Feedback Submit</button>
                    </div>
                </div>
            </form>
        )}
        <>
        {feedbackbtndisable && (
            <div className='After-feedback' >
                <div className='After-feedback-content'>
                <h5 style={{marginBottom:10}}>{feedback}</h5>
                <button onClick={handlegotohome} style={{width:150}}>Back To Home</button>
                </div>

            </div>
            )}
        </>
    </div>
  )
}

export default Order