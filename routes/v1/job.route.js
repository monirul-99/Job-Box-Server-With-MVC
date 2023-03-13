const express = require("express");
const jobControllers = require("../../controllers/job.controllers");
const limiter = require("../../middleware/limiter");
const viewCount = require("../../middleware/viewCount");

const router = express.Router();
router
  .route("/")
  /**
   * @api {get} /tools All tools
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(jobControllers.getJob)
  /**
   * @api {post} /tools save a tool
   * @apiDescription Get all the tools
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [limit=10]  Users per page
   *
   * @apiSuccess {Object[]} all the tools.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .post(jobControllers.jobAdd);

router.route("/:email").get(jobControllers.getJobByEmail);
router
  .route("/:id/")
  .get(viewCount, limiter, jobControllers.getProductDetails)
  .patch(jobControllers.productsUpdate)
  .delete(jobControllers.productDelete);

module.exports = router;
