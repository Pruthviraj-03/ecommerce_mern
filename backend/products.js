import dotenv from "dotenv";
import { connectDB } from "./src/configs/db.js";
import { Product } from "./src/models/products.model.js";
import fs from "fs/promises";

dotenv.config({
  path: "./.env",
});

const loadData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    throw error;
  }
};

const product = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);

    // Load data from JSON file
    const productsData = await loadData("./products.json");

    // Create documents in the database
    await Product.create(productsData);
    console.log("success");
  } catch (error) {
    console.error(error);
  }
};

product();
