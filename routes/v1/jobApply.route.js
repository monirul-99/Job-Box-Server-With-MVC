const express = require("express");
const jobApplyControllers = require("../../controllers/jobApply.controller");

const router = express.Router();

router.route("/").patch(jobApplyControllers.jobQuestionReply);
router.route("/:email").get(jobApplyControllers.appliedJobByEmail);
module.exports = router;
