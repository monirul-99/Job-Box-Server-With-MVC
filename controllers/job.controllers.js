const students = [
  { id: 1, name: "Monirul Islam" },
  { id: 2, name: "Sadia Islam" },
  { id: 3, name: "Unknown Islam" },
];

module.exports.getJob = (req, res, next) => {
  res.json(students);
};

module.exports.jobAdd = (req, res, next) => {
  const user = req.body;
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
  res.send(newData);
};

module.exports.productDelete = (req, res, next) => {
  const { id } = req.params;
  const newData = students.filter((user) => user.id !== Number(id));
  res.send(newData);
};
