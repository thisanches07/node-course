const express = require("express");

const router = express.Router();

const nftController = require("../controllers/nft");

router.get("/", nftController.getNfts);

router.get("/:marketId", nftController.getNftById);

module.exports = router;
