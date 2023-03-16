const express = require("express");
const jobAskReplyControllers = require("../../controllers/jobAskReply.controller");

const router = express.Router();

router.route("/:email/:id").get(jobAskReplyControllers.appliedJob);
router.route("/").patch(jobAskReplyControllers.QuestionReply);

module.exports = router;
