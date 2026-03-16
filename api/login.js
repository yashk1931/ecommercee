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

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password required"
      });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      user
    });

  } catch (error) {

    res.json({
      success: false,
      message: "Server error"
    });

  }

}