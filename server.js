// server and route variables
const express = require("express");
const path = require("path");
// const routes = require("./controllers");
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars and helper variables
// const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
// const hbs = exphbs.create({ helpers });

// sequelize and session variables
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: process.env.APP_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Ready to go on http://localhost:${PORT}`)
  );
});