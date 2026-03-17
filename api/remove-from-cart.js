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

  const { userId, index } = req.body;

  const user = await User.findById(userId);

  if (!user) {
    return res.json({ success: false });
  }

  if (user.cart[index].quantity > 1) {
    user.cart[index].quantity -= 1;
  } else {
    user.cart.splice(index, 1);
  }

  await user.save();

  res.json({
    success: true,
    cart: user.cart
  });

}
