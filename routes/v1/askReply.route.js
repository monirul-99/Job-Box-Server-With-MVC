const express = require("express");
const jobAskReplyControllers = require("../../controllers/jobAskReply.controller");

const router = express.Router();

router.route("/").patch(jobAskReplyControllers.QuestionReply);

module.exports = router;
