const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dbConnect = require("./utils/dbConnect");
const productRouter = require("./routes/v1/product.route");
const viewCount = require("./middleware/viewCount");
const errorHandler = require("./middleware/errorHandler");
//middle Ware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
// app.use(viewCount);

dbConnect();
app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/public/index.html");
  res.render("home.ejs", {
    user: {
      name: "Monirul Islam",
    },
  });
});

app.all("*", (req, res) => {
  res.send("No Route Found");
});

app.use(errorHandler);

app.listen(5000, () => console.log("Shop EX CMD Running"));

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
