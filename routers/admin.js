const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/nfts", adminController.getNfts);

// /admin/add-product => GET
router.get("/add-nft", isAuth, adminController.getAddNft);

router.post("/add-nft", isAuth, adminController.postAddNft);

router.post("/delete-nft", isAuth, adminController.postDeleteNft);

module.exports = router;
