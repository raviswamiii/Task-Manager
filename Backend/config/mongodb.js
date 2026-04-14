import mongoose from "mongoose";

const databaseConnection = () => {
  mongoose.connection.on("connected", () => {
    console.log("🗄️  connected to database");
  });

  mongoose.connect(process.env.MONGO_URI);
};

export default databaseConnection;
