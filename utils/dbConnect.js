function dbConnect() {
  //   const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wa0jwjm.mongodb.net/?retryWrites=true&w=majority`;
  //   const client = new MongoClient(uri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     serverApi: ServerApiVersion.v1,
  //   });

  console.log("DB Connects");
}

module.exports = dbConnect;
