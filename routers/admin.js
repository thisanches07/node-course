const path = require("path");

const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/nfts", adminController.getNfts);

// /admin/add-product => GET
router.get("/add-nft", adminController.getAddNft);

router.post("/add-nft", adminController.postAddNft);

router.post("/delete-nft", adminController.postDeleteNft);

module.exports = router;
