const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);

const sequelize = require("./utils/database");
const User = require("./models/user");
const Nft = require("./models/nft");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const options = {
  connectionLimit: 10,
  password: "admin",
  user: "root",
  database: "marketplace",
  host: "localhost",
  port: 3000,
  createDatabaseTable: true,
};
const sessionStore = new mysqlStore(options);

app.use(
  session({
    name: process.env.SESS_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: "secret",
    cookie: {
      maxAge: 10,
    },
  })
);

const errorController = require("./controllers/error");
const adminRoutes = require("./routers/admin.js");
const nftRoutes = require("./routers/nft.js");
const authRoutes = require("./routers/auth.js");

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
app.use(authRoutes);

app.use(errorController.get404);

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
