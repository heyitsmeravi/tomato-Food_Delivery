import React from 'react'
import './Verify.css'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const orderId = searchParams.get("orderId");
    const success = searchParams.get("success");
    // console.log("orderId:", orderId);
    // console.log("success:", success);
    const {url } = useContext(StoreContext);
    const navigate = useNavigate();
    const verifyPayment = async () => {
        const response = await axios.post(url+"/api/order/verify",{success, orderId});
        // console.log("response:", response);
        if ( response.data.success){
            // alert(response.data.message);
            navigate("/myorders");
        }else{
            navigate("/");
        }
    }
    useEffect(() => {
        verifyPayment();
    },[]);

  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify;
