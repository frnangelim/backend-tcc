require("dotenv/config");

const cors = require("cors");
const express = require("express");
const parser = require("body-parser");

const environment = require("./config/environment");

// Routes
const routes = require("./application/routes/routes");

// Constants
const PORT = environment.PORT || 3001;

const application = express();

application.use(cors());
application.use(parser.json({ limit: "5mb" }));
application.use(parser.urlencoded({ limit: "5mb", extended: false }));
application.use("/", routes);

application.listen(PORT, () => {
  console.log(`O projeto está rodando na porta ${PORT}.`);
});
