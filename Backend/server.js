import mongoose from "mongoose";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);

  isConnected = true;
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: [
    {
      name: String,
      price: Number,
      image: String,
      quantity: Number
    }
  ]
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req, res) {

  await connectDB();

  if (req.method === "POST" && req.url.includes("signup")) {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields required" });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      cart: []
    });

    await user.save();

    return res.json({
      success: true,
      message: "Signup successful",
      user
    });

  }

  if (req.method === "POST" && req.url.includes("login")) {

    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user
    });

  }

  res.status(404).json({ message: "Route not found" });
}
