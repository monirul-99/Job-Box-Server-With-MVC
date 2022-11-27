const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
require("dotenv").config();
// const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//middle Ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wa0jwjm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const userShopEXCollection = client.db("shopExDB").collection("shopEXUser");
    const categoriesShopEXCollection = client
      .db("shopExDB")
      .collection("categoriesThreeItems");
    const allCateShopEXCollection = client
      .db("shopExDB")
      .collection("totalCategories");
    const ordersShopEXCollection = client
      .db("shopExDB")
      .collection("ordersProducts");
    const reportShopEXCollection = client
      .db("shopExDB")
      .collection("productsReport");
    const paymentShopEXCollection = client
      .db("shopExDB")
      .collection("paymentsSuccessBuyers");

    app.get("/categories-three-card", async (req, res) => {
      const query = {};
      const result = await categoriesShopEXCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/all-seller", async (req, res) => {
      const result = await userShopEXCollection
        .find({ position: "Seller" })
        .toArray();
      res.send(result);
    });

    app.get("/all-categories", async (req, res) => {
      const query = {};
      const result = await allCateShopEXCollection.find(query).toArray();
      res.send(result);
    });
    app.get("/categories-search/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const result = await ordersShopEXCollection.findOne(filter);
      res.send(result);
    });

    app.get("/my-products-email/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const Products = await allCateShopEXCollection.find(query).toArray();
      res.send(Products);
    });

    app.get("/all-categories/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { productsId: parseInt(id) };
      const result = await allCateShopEXCollection.find(filter).toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userShopEXCollection.insertOne(user);
      res.send(result);
    });

    app.post("/create-payment-intent", async (req, res) => {
      const product = req.body;
      const price = product.price;
      const amount = price * 100;
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "usd",
        amount: amount,
        payment_method_types: ["card"],
      });
      res.send({
        clientServer: paymentIntent.client_secret,
      });
    });

    app.post("/payment-success-buyers", async (req, res) => {
      const payment = req.body;
      const result = await paymentShopEXCollection.insertOne(payment);
      const id = payment.productsId;
      const filter = { _id: ObjectId(id) };
      const updatedDoc = {
        $set: {
          paid: true,
          transactionId: payment.transactionId,
        },
      };
      const updatedResult = await ordersShopEXCollection.updateOne(
        filter,
        updatedDoc
      );
      res.send(result);
    });
    app.get("/get-users", async (req, res) => {
      const query = {};
      const result = await userShopEXCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/get-orders-products", async (req, res) => {
      const query = {};
      const result = await ordersShopEXCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/add-product", async (req, res) => {
      const product = req.body;
      const result = await allCateShopEXCollection.insertOne(product);
      res.send(result);
    });

    app.post("/add-report", async (req, res) => {
      const product = req.body;
      const result = await reportShopEXCollection.insertOne(product);
      res.send(result);
    });

    app.get("/report-get", async (req, res) => {
      const query = {};
      const result = await reportShopEXCollection.find(query).toArray();
      res.send(result);
    });
    app.post("/orders-products", async (req, res) => {
      const orders = req.body;
      const result = await ordersShopEXCollection.insertOne(orders);
      res.send(result);
    });

    app.get("/advertise-products/:email", async (req, res) => {
      const email = req.params.email;
      const result = await allCateShopEXCollection
        .find({
          email: email,
          advertise: true,
          status: "available",
        })
        .toArray();
      res.send(result);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          advertise: true,
        },
      };
      const result = await allCateShopEXCollection.updateMany(
        filter,
        updateDoc,
        option
      );
      res.send(result);
    });

    app.put("/sold-product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          status: "sold",
        },
      };
      const result = await allCateShopEXCollection.updateMany(
        filter,
        updateDoc,
        option
      );
      res.send(result);
    });

    app.delete("/order-products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await ordersShopEXCollection.deleteOne(query);
      res.send(result);
    });

    app.delete("/all-categories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await allCateShopEXCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/orders-get-email/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const ordersProducts = await ordersShopEXCollection.find(query).toArray();
      res.send(ordersProducts);
    });

    app.get("/my-products/admin/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userShopEXCollection.findOne(query);
      res.send({ isAdmin: user?.admin === true });
    });

    app.get("/my-products/seller/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await userShopEXCollection.findOne(query);
      res.send({ isSeller: user?.position === "Seller" });
    });

    //   app.post('/orders-get-by-email', async (req, res) => {
    //     const orders = req.body;
    //     const query = {
    //         email: orders.email,
    //         productId: orders.productId
    //     }
    //     const alreadyWishlist = await wishlistsCollections.find(query).toArray();
    //     if (alreadyWishlist.length) {
    //         const message = Already wishlist This product ${wishlist.name};
    //         return res.send({ acknowledged: false, message })
    //     }

    //     const wishlistProduct = await wishlistsCollections.insertOne(wishlist);
    //     res.send(wishlistProduct)
    // })

    app.get("/update", async (req, res) => {
      const filter = {};
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          email: "sohelmuhammad164@gmail.com",
        },
      };
      const result = await allCateShopEXCollection.updateMany(
        filter,
        updateDoc,
        option
      );

      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Shop Ex Running");
});

app.listen(5000, () => console.log("CMD Running"));
