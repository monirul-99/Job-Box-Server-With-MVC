const students = [
  { id: 1, name: "Monirul Islam" },
  { id: 2, name: "Sadia Islam" },
  { id: 3, name: "Unknown Islam" },
];

module.exports.getProduct = (req, res, next) => {
  //   res.download(__dirname + "/Certificate Of Web Developer.pdf");
  //   res.redirect("/monirul");
  const { limit, page } = req.query;
  console.log(limit, page);
  res.json(students.slice(0, limit));
};

module.exports.productAdd = (req, res, next) => {
  students.push(req.body);
  console.log(req.query);
  res.send(students);
};

module.exports.getProductDetails = (req, res, next) => {
  const { id } = req.params;
  const foundItems = students.find((user) => user.id === Number(id));
  res.status(200).send({
    success: true,
    data: foundItems,
    message: "Successfully Data Access",
  });
  res.status(500).send({
    success: false,
    error: "UnSuccessful Data Access",
  });
};

module.exports.productsUpdate = (req, res, next) => {
  const { id } = req.params;
  const newData = students.find((user) => user.id === Number(id));
  newData.id = id;
  newData.name = req.body.name;
  console.log(students);
  res.send(newData);
};

module.exports.productDelete = (req, res, next) => {
  const { id } = req.params;
  const newData = students.filter((user) => user.id !== Number(id));
  console.log(students);
  res.send(newData);
};
