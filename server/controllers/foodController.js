import foodModel from "../models/foodModel.js"
import fs from 'fs'
// add food item
const addFood = async (req, res) => {
    // console.log("req.file =", req.file);
    // console.log("req.body =", req.body);
    let image_filename = `${req.file.filename}`;
    // fs.unlinkSync(`uploads/${req.file.filename}`);
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });
    try{
        await food.save();
        res.json({success: true, message: "Food added successfully"});
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error adding food"});
    }

}

const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    }catch(err){
        console.log(err);
        res.json({success: false, message: "Error listing food"});
    }   
}

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, (err) => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food removed successfully"});
    } catch(err){ 
        console.log(err);
        res.json({success: false, message: "Error removing food"});
    }
}
export {addFood,listFood, removeFood}