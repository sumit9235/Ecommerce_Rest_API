const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model');
const { orderModel } = require('../models/order.model')
const { ProductModel } = require('../models/products.model');
const { authenticate } = require('../Middlewares/authentication');

// user registration
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ msg: "User already exists. Please log in." });
  }

  try {
    bcrypt.hash(password, 4, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const newUser = new UserModel({ name, email, password: hash });
      await newUser.save();

      res.status(201).json({ msg: "New user has been registered" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// user login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email })
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          let accessToken = jwt.sign({ id: user[0]._id }, process.env.accessKey, { expiresIn: "5m" })
          res.status(200).send({
            "msg": "Login Succesfull", "AcessToken": accessToken
          })
        } else {
          res.status(400).send({ "msg": "Password is incorrect" })
        }
      })
    } else {
      res.status(404).send({ "msg": "Email does not exist" })
    }
  } catch (error) {
    res.status(400).send({ "error": error.message })
  }
})


// checking products in user cart
userRouter.get("/cart", authenticate, async (req, res) => {
  const id = req.body.userid;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Retrieve the products from the user's cart
    const cartProducts = user.cart;

    res.status(200).send({ "cart": cartProducts });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//adding product in user cart
userRouter.post("/addtocart", authenticate, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.body.userid;

  try {
    const product = await ProductModel.findById(product_id);

    if (!product || !product.productAvailability) {
      return res.status(400).send("Product is unavailable");
    }
    const user = await UserModel.findById(user_id);
    const newItem = {
      product: product,
      quantity: quantity || 1,
    };
    user.cart.push(newItem);
    await user.save();
    res.status(200).send({ "msg": "Product added to cart" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


//updating quantities in user cart for a single product
userRouter.patch("/update", authenticate, async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.body.userid;

  try {
    const product = await ProductModel.findById(product_id);

    if (!product || !product.productAvailability) {
      res.status(200).send("Product is unavailable");
      return
    }

    const user = await UserModel.findById(user_id);

    const cartItemIndex = user.cart.findIndex(item => item.product._id.equals(product_id));

    if (cartItemIndex !== -1) {
      user.cart.splice(cartItemIndex, 1);
      const newItem = {
        product: product,
        quantity: quantity || 1,
      };
      user.cart.push(newItem);

    } else {
      res.status(200).send("Product not found in cart");
      return
    }

    await user.save();

    res.status(200).send({ "msg": "Quantity updated in cart" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// remove item from user cart
userRouter.delete("/removefromcart/:product_id", authenticate, async (req, res) => {
  const { product_id } = req.params;
  const user_id = req.body.userid

  try {
    const user = await UserModel.findById(user_id);

    const cartItemIndex = user.cart.findIndex(item => item.product._id.equals(product_id));

    if (cartItemIndex !== -1) {

      user.cart.splice(cartItemIndex, 1);
    } else {
      return res.status(400).send("Product not found in cart");
    }

    await user.save();

    res.status(200).send({ "msg": "Product removed from cart" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// making order placement
userRouter.post("/placeorder", authenticate, async (req, res) => {
  const user_id = req.body.userid;

  try {
    const user = await UserModel.findById(user_id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const orderedProducts = user.cart.map(cartItem => ({
      product: cartItem.product._id,
      quantity: cartItem.quantity,
    }));

    const order = new orderModel({
      userId: user_id,
      products: orderedProducts,
    });

    await order.save();

    user.cart = [];
    await user.save();

    res.status(200).send({ "msg": "Order placed successfully" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// fetching history of order of a user
userRouter.get("/user-orders", authenticate, async (req, res) => {
  const user_id = req.body.userid;

  try {
    const user = await UserModel.findById(user_id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Find orders for the user
    const orders = await orderModel.find({ userId: user_id }, '_id products orderDate');

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// getting details of a particular order
userRouter.get("/order/:order_id", authenticate, async (req, res) => {
  const order_id = req.params.order_id;

  try {
    // Find the order by order ID
    const order = await orderModel.findById(order_id);

    if (!order) {
      return res.status(404).send("Order not found");
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


module.exports = {
  userRouter
}

