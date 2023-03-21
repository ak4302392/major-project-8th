import mongoose from "mongoose";

import CONFIG from "./config";

export const connectDB = async () => {
  if (CONFIG.DB.URL) {
    await mongoose.connect(CONFIG.DB.URL);
    console.log("DB connected");
  } else {
    throw new Error("Provide DB url");
  }
};
