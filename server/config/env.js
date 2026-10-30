import dotenv from "dotenv";

const environment = process.env.NODE_ENV === "production"
    ? "production"
    : "development";

dotenv.config({ path: `.env.${environment}` });

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
    dotenv.config();
}
