const { json } = require("express");
const Nft = require("../models/nft");

const errorController = require("./error");

exports.getNfts = (req, res, next) => {
  Nft.findAll()
    .then((nfts) => {
      res.render("nft/index", {
        prods: nfts,
        pageTitle: "Nfts",
        path: "/",
        isAuthenticated: req.session.isLoggedIn,
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
      if (!nft) {
        return res.redirect("/404");
      }
      res.render("nft/nft-detail", {
        nft: nft,
        pageTitle: nft.name,
        path: "/nft",
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
