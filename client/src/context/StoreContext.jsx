import { createContext, useEffect, useState } from "react";
// import {food_list} from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = "http://localhost:4000";
    const [food_list, setFoodList] = useState([]);
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    }
    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
        }
        async function loadData () {
            await fetchFoodList();
        }
        loadData();
    },[]);
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    }
    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems ){
            if (cartItems[item] > 0 ) {
                let itemInfo = food_list.find((product) => product._id == item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }
    const ContextValue = {
        food_list,
        cartItems,
        setCartItems, 
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        url
    }
    return (
        <StoreContext.Provider value = {ContextValue}>
            {props.children}
        </StoreContext.Provider>  
    )
}
export default StoreContextProvider