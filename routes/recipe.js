const express = require("express"),
  router = express.Router(),
  recipeController = require("../controllers/recipe.controller"),
  imageController = require("../controllers/image.controller.js"),
  {checkToken} = require("../middlewares/auth.js"),
  multerLib = require("multer")();

router.post("/create",  checkToken, multerLib.single('image'), imageController.create, recipeController.create);
router.put(
  "/update/:recipeId",
  checkToken,
  multerLib.single('image'),
  recipeController.updaterecipe,
  imageController.updateImage
);
router.get("/filterSearch", recipeController.filterAndSearch);
router.get("/", recipeController.getAllrecipes);
router.get("/:recipeId" ,checkToken,recipeController.getrecipeById);
router.delete("/:recipeId", checkToken,  recipeController.deleterecipe, imageController.deleteImage);

// SEARCH
// localhost:3000/api/v1/recipe/search/modul

module.exports = router;
