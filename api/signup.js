import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  cart: []
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default async function handler(req, res) {

  await mongoose.connect(process.env.MONGO_URI);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success:false, message:"All fields required" });
  }

  const existing = await User.findOne({ email });

  if (existing) {
    return res.json({ success:false, message:"User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    cart:[]
  });

  res.json({
    success:true,
    message:"Signup successful",
    user
  });
}