const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/v1/user.route");
const jobRouter = require("./routes/v1/job.route");
const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");
//middle Ware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

connectToServer((err) => {
  if (!err) {
    app.listen(5000, () => console.log("Job Box CMD Running"));
  } else {
    console.log(err);
  }
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);

app.get("/", (req, res) => {
  res.send("Hello Job");
});

app.all("*", (req, res) => {
  res.send("No Route Found");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
