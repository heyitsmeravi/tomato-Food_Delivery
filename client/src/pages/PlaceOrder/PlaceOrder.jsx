// import React from 'react'
import { useContext,useState } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios'
const PlaceOrder = () => {
  const { getTotalCartAmount , token, food_list, cartItems, url} = useContext(StoreContext);
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  });
  const onchangeHandler = (e) => {
    setData((data) => {
      return {...data, [e.target.name]: e.target.value};
    });
  }; 
  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) =>{
      if (cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id ];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount() + 2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert("Error placing order. Please try again.");
    }
    
  }
  const navigate = useNavigate();
    useEffect(() => {
      if (!token){
        navigate('/cart');
      }else if (getTotalCartAmount() === 0){
        navigate('/cart');
      }
    }, [token]);

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className = "title"> Delivery Information</p>
        <div className="multi-fields">
            <input type="text" placeholder="First Name" onChange={onchangeHandler} name="firstName" value={data.firstName} required/>
            <input type="text" placeholder="Last Name" onChange={onchangeHandler} name="lastName" value={data.lastName} required/>
        </div>
        <input type="email" placeholder="Email" onChange={onchangeHandler} name="email" value={data.email} required/>
        <input type="text" placeholder="Street" onChange={onchangeHandler} name="street" value={data.street} required/>
        <div className="multi-fields">
            <input type="text" placeholder="City" onChange={onchangeHandler} name="city" value={data.city} required/>
            <input type="text" placeholder="State" onChange={onchangeHandler} name="state" value={data.state} required/>
        </div>
        <div className="multi-fields">
            <input type="text" placeholder="Zip Code" onChange={onchangeHandler} name="zipCode" value={data.zipCode} required/>
            <input type="text" placeholder="Country" onChange={onchangeHandler} name="country" value={data.country} required/>
        </div>   
        <input type="text" placeholder="Phone Number" onChange={onchangeHandler} name="phone" value={data.phone} required/>
      </div>
      <div className =" place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detail">
              <p>Sub Total</p>
              <p> ${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p> ${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <b>Total</b>
              <b> ${getTotalCartAmount()===0?0: getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type="submit"> Proceed to checkout </button>
        </div>
      </div>  
    </form>
  )
}

export default PlaceOrder
