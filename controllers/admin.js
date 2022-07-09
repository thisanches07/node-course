const Nft = require("../models/nft");

exports.getNfts = (req, res, next) => {
  req.user
    .getNfts()
    .then((products) => {
      res.render("admin/adminNfts", {
        prods: products,
        pageTitle: "Admin Nfts",
        path: "/admin/nfts",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddNft = (req, res, next) => {
  res.render("admin/edit-nft", {
    pageTitle: "Add Nft",
    path: "/admin/add-nft",
    editing: false,
  });
};

exports.postAddNft = (req, res, next) => {
  console.log("entrou");
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createNft({
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log("Created Nft");
      res.redirect("/admin/nfts");
    })
    .catch((err) => {
      console.log(err);
    });
};
