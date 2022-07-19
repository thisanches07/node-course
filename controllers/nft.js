const Nft = require("../models/nft");

const errorController = require("./error");

exports.getNfts = (req, res, next) => {
  console.log("isLoggedIn = " + req.session.isLoggedIn);
  Nft.findAll()
    .then((nfts) => {
      res.render("nft/index", {
        csrfToken: req.csrfToken(),
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
      if (!nft) {
        return res.redirect("/404");
      }
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
