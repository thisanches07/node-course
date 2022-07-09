const { json } = require("express");
const db = require("../utils/database.js");
const Nft = require("../models/nft");

exports.getNfts = (req, res, next) => {
  Nft.findAll()
    .then((nfts) => {
      res.render("nft/index", {
        prods: nfts,
        pageTitle: "Nfts",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getNftById = (req, res, next) => {
  const id = req.params.marketId;
  Nft.findByPk(id)
    .then((nft) => {
      res.render("nft/nft-detail", {
        nft: nft,
        pageTitle: nft.name,
        path: "/nft",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
