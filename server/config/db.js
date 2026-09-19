import mongoose from "mongoose";
const connectDB = async () => {
    await mongoose.connect('mongodb+srv://heyitsmeravi01_db_user:5CZZNCzKKYVYmPfO@cluster0.gw7tkdl.mongodb.net/Tomato_Food-Delivery-System')
    .then(()=>{ console.log("Connected to MongoDB"); })
    .catch((err)=>{ console.log(err); });
}
export default connectDB;