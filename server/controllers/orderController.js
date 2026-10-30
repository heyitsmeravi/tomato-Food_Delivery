import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import "dotenv/config";
const placeOrder = async (req, res) => {
    const frontend_url =  process.env.FRONTEND_URL || "http://localhost:5173";
     try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});
        const lineItems = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 95
            },
            quantity: item.quantity
        }));
        lineItems.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*95
            },
            quantity: 1 
        });
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
        res.status(200).json({success:true,session_url: session.url});
    }catch(error){
        console.log(error); 
        res.status(500).json({success:false, message: "Internal Server Error"});
    }
}

const verifyOrder = async (req,res) =>{
    const {orderId, success} = req.body;
    try{
        if(success === "true"){
          await orderModel.findByIdAndUpdate(orderId, {payment:true});
          res.json({success:true, message:"Payment successful. Your order has been placed."});
          // alert("Payment successful. Your order has been placed.");
        }
        else{
          await orderModel.findByIdAndDelete(orderId);
          res.json({success:false, message:"Payment failed. Your order has been cancelled."});
          //alert("Payment failed. Your order has been cancelled.");
        }
    }catch(error){
      console.log(error);
      res.json({success:false, message:"Internal Server Error"});
    }
}

const userOrders = async (req, res) => {
    try{
        const userId = req.body.userId;
        // console.log("userId:", userId);
        const orders = await orderModel.find({ userId:userId });
        // console.log("orders:", orders); 
        res.json({success:true, data: orders});
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Internal Server Error"});
    }
}

const listOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success:true, data: orders}); 
    }catch ( error ){
        console.log(error);
        res.json({success:false, message:"Internal Server Error"}); 
    }
}

const updateOrderStatus = async (req, res) => {
    const { orderId, status } = req.body;
    try {
        const order = await orderModel.findByIdAndUpdate(orderId, { status: status });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { placeOrder, verifyOrder , userOrders, listOrders, updateOrderStatus};