import { createContext, useEffect, useState } from "react";
// import {food_list} from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const url = import.meta.env.VITE_API_URL
     ;
    const [food_list, setFoodList] = useState([]);
    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data);
    } 
    const loadCartData = async (token) => {
        if (token){
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
            setCartItems(response.data.cartData);
        }
    }
    useEffect(() => {
        async function loadData () {
            await fetchFoodList();
            if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
    },[]);
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token){
            await axios.post(url+"/api/cart/add",{foodId:itemId},{headers:{token}});
        }
    }
    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if (token){
            await axios.post(url+"/api/cart/remove",{foodId:itemId},{headers:{token}});
        }    
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