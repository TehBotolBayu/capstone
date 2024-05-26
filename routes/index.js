const express = require("express"),
  router = express.Router(),
  categoryRouter = require("./category"),
  recipeRouter = require("./recipe"),
  userRouter = require("./user");

router.use("/category", categoryRouter);
router.use("/recipe", recipeRouter);
router.use("/chapter", chapterRouter);
router.use("/material", materialRouter);
router.use("/user", userRouter);
router.use("/transaction", transactionRouter);
router.use("/myClass", myClassRouter);

module.exports = router;
