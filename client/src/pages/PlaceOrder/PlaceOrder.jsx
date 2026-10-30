// import React from 'react'
import { useContext,useState } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
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
  const [pincodeError, setPincodeError] = useState("");
  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setPincodeError("Please enter a valid 6-digit pincode");
    } else {
      setPincodeError("");
    }
    setData((data) => {
      return {...data, [e.target.name]: e.target.value};
    });
    try{
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const result = response.data;
      if (result[0].Status !== "Success") {
        setPincodeError("Invalid pincode. Please enter a valid pincode.");
        return;
      }
      const postOfficeData = result[0].PostOffice[0];
      setData((data) => {
        return {
          ...data,
          city: postOfficeData.District,
          state: postOfficeData.State,
          country: postOfficeData.Country
        };
      });
      setPincodeError("");
    } catch (error) {
      console.error("Error fetching pincode data:", error);
    }
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
        toast.error("Please login to place order");
      }else if (getTotalCartAmount() === 0){
        toast.error("Your cart is empty. Please add items to place order");
        navigate('/cart');
      }
    }, [token,navigate, getTotalCartAmount]);

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
            <input type="text" placeholder="Zip Code" onChange={handlePincodeChange} name="zipCode" value={data.zipCode} inputMode="numeric" pattern="[1-9][0-9]{5}" maxLength = {6} required/>
            <input type="text" placeholder="Country" onChange={onchangeHandler} name="country" value={data.country} readOnly required/>
        </div>   
        <div className="multi-fields">
            <input type="text" placeholder="City" onChange={onchangeHandler} name="city" value={data.city} readOnly required/>
            <input type="text" placeholder="State" onChange={onchangeHandler} name="state" value={data.state} readOnly required/>
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
