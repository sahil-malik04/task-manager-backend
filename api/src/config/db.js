const { default: mongoose } = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(`DB connected successfully! ${conn.connection.host}`);
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

module.exports = connectDB;
