import mongoose from "mongoose";

type Connection = {
  isConnected: boolean;
};

const connection: Connection = {
  isConnected: false,
};

const connectDB = async () => {
  if (connection.isConnected) {
    console.log("DB already connected");

    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URL!);
    connection.isConnected = db.connection.readyState === 1;
    console.log("DB connected");
  } catch (error) {
    console.error((error as Error).message);
    console.log("Error to connect db");
    process.exit(1);
  }
};

export default connectDB;
