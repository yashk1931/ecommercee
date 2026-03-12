const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb://yash:test1234@ac-8s2bnwe-shard-00-00.mwqkhg3.mongodb.net:27017,ac-8s2bnwe-shard-00-01.mwqkhg3.mongodb.net:27017,ac-8s2bnwe-shard-00-02.mwqkhg3.mongodb.net:27017/ecommerce?ssl=true&replicaSet=atlas-nhgfuy-shard-0&authSource=admin&retryWrites=true&w=majority"
)
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
  console.log("Signup request body:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Missing fields!");
      return res.json({ success: false, message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      return res.json({ success: false, message: "User already exists" });
    }

    const user = new User({ name, email, password, cart: [] });
    await user.save();
    console.log("User saved in database:", user);

    res.json({ success: true, message: "Signup successful", user });
  } catch (err) {
    console.log("Signup error:", err);
    res.json({ success: false, message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful", user });
  } catch (err) {
    console.log("Login error:", err);
    res.json({ success: false, message: "Server error" });
  }
});

app.post("/add-to-cart", async (req, res) => {
  try {

    const { userId, item } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const existingItem = user.cart.find(
      cartItem => cartItem.name === item.name
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cart.push({
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    await user.save();

    res.json({
      success: true,
      cart: user.cart
    });

  } catch (err) {

    console.log("Add to cart error:", err);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});

app.get("/cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.json({ success: false });

    res.json({ success: true, cart: user.cart });
  } catch (err) {
    console.log("Get cart error:", err);
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));