const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/dbConnect");

module.exports.QuestionReply = async (req, res, next) => {
  try {
    const db = getDB();
    const userId = req.body.userID;
    const reply = req.body.reply;
    const filter = { "queries.id": ObjectId(userId) };
    const updateDoc = {
      $push: { "queries.$[user].reply": reply },
    };

    const arrayFilter = {
      arrayFilters: [{ "user.id": ObjectId(userId) }],
    };
    const result = await db
      .collection("JobBoxJob")
      .updateOne(filter, updateDoc, arrayFilter);
    if (result?.acknowledged) {
      return res.json({ status: true, data: result });
    }
    res.send({ status: false });
  } catch (err) {
    next(err);
  }
};
