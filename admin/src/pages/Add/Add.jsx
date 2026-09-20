// import React from 'react'
import "./Add.css"
import { assets } from "../../assets/assets"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify";
const Add = ({url}) => {
    const [ image , setImage ] = useState(false);
    const [ data , setData ] = useState({
        name:"",
        description:"",
        category:"Salad",
        price:""
    });
    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(data);
        const formData = new FormData();
        formData.append("image",image);
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("price",data.price);
        console.log(formData);
        const response = await axios.post(`${url}/api/food/add`,formData);
        if (response.data.success){
            // alert("Food Item Added Successfully");  
            setData({
                name:"",
                description:"",
                category:"Salad",
                price:""
            });
            setImage(false);
            toast.success(response.data.message);
        }else{
            toast.error(response.data.message);
        }
    }
    useEffect(()=>{
        console.log(data);
    },[data]);
  return (
    <div className='add'>
      <form action="" className = "flex-col">
        <div className="add-img-upload flex-col">
            <p>Upload Image </p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])}  type="file" name="" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
            <p>Product Name</p>
            <input onChange={handleChange}  value={data.name} type="text" name="name" placeholder="Type here" required/>
        </div>
        <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea onChange={handleChange} value={data.description} name="description" rows="6" id="" placeholder="write content here" required></textarea>
        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product Category</p>
                <select onChange={handleChange} value={data.category} name="category" id="">
                    <option value="Salad">Salad</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Noodles">Noodles</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Sandwich">Sandwich</option>
                    <option value="Cake">Cake</option>
                    <option value="Pure Veg">Pure Veg</option>
                    <option value="Pasta">Pasta</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={handleChange} value={data.price} type="number" name="price" id="" placeholder="$20" />
            </div>
        </div>
        <button onClick={handleSubmit} type='submit' className="add-btn" > ADD </button>
      </form>
    </div>
  )
}

export default Add
