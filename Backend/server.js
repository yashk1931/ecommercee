require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error:", err));

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

const User = mongoose.model("User", UserSchema, "users");

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.json({ success: false, message: "All fields required" });

        const existing = await User.findOne({ email });
        if (existing)
            return res.json({ success: false, message: "User already exists" });

        const user = new User({ name, email, password, cart: [] });
        await user.save();

        res.json({ success: true, message: "Signup successful", user });
    } catch (err) {
        res.json({ success: false, message: err.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.json({ success: false, message: "Invalid email or password" });

        res.json({ success: true, message: "Login successful", user });
    } catch (err) {
        res.json({ success: false, message: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
