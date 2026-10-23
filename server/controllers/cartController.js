import userModel from '../models/userModel.js';

//add item to cart 
const addToCart = async (req, res) => {
    // console.log(req.body);
    console.log("Adding to cart");
    try{
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData;
        if ( !cartData[req.body.foodId] ){
            cartData[req.body.foodId] = 1;
        }else{ 
            cartData[req.body.foodId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.json({success: true, message: "Item added to cart"});
    } catch (err){
        console.error(err);
        res.status(500).json({success: false, message: "Error adding item to cart"});
    }
}
//remove item from cart
const removeFromCart = async (req, res) => {
    console.log("Removing from cart");
    // console.log(req.body);
    try{
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        if (cartData[req.body.foodId] > 0) {
            cartData[req.body.foodId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData});
        res.json({success: true, message: "Item removed from cart"});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error removing item from cart"});
    }
}

//fetch item from cart 
const getCart = async (req, res) => {
    console.log("Fetching cart");
    // console.log(req.body);
    try{
        let userData = await userModel.findOne({_id: req.body.userId});
        let cartData = await userData.cartData;
        res.json({success: true, cartData: cartData});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Error fetching cart"});
    }
}

export {
    addToCart,
    removeFromCart,
    getCart
}