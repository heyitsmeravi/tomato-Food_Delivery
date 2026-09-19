// import React from 'react'
import { useContext } from 'react';
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className = "title"> Delivery Information</p>
        <div className="multi-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
            <input type="text" placeholder="Pin Code" />
            <input type="text" placeholder="Country" />
        </div>   
        <input type="text" placeholder="Phone Number" />
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
          <button onClick = {()=>navigate("/order")}> Proceed to checkout </button>
        </div>
      </div>  
    </div>
  )
}

export default PlaceOrder
