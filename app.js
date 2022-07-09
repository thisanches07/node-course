const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./utils/database");
const User = require("./models/user");
const Nft = require("./models/nft");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routers/admin.js");
const nftRoutes = require("./routers/nft.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log("======================================");
  User.findByPk(1)
    .then((user) => {
      console.log(user);
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use("/nfts", nftRoutes);

User.hasMany(Nft);

sequelize
  .sync()
  .then((result) => {
    User.findByPk(1);
  })
  .then((user) => {
    if (user) {
      console.log("================");
      console.log("CRIANDO NOVO USUÁRIO, user com id = 1 nao encontrado");
      console.log("================");
      return User.create({ name: "Thiago", email: "test@test.com" });
    }
    return user;
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
