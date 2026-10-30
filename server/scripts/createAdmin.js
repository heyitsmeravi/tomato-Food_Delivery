import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import adminModel from "../models/adminModel.js";

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const password = process.env.ADMIN_PASSWORD;

        if (!email || !password) {
            throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
        }

        const existingAdmin = await adminModel.findOne({ email });

        if (existingAdmin) {
            console.log("Admin already exists!");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await adminModel.create({
            name: "Tomato Admin",
            email,
            password: hashedPassword
        });

        console.log("First admin created successfully!");

    } catch (error) {
        console.error("Admin creation failed:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();