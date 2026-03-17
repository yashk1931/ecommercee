import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
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

  await mongoose.connect(process.env.MONGO_URI);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    const { userId, item } = req.body;

    if (!userId || !item) {
      return res.json({
        success: false,
        message: "Missing data"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    // check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItemIndex !== -1) {

      // increase quantity
      user.cart[existingItemIndex].quantity += 1;

    } else {

      // add new item
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

  } catch (error) {

    console.log("Add to cart error:", error);

    res.json({
      success: false,
      message: "Server error"
    });

  }

}
