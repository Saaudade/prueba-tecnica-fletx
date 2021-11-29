const express = require('express');
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use("/api", router);
require("./routes/efemeride.js")(router);

app.get("/", (req, res) => {
  res.send("<h1>Producto server</h1>");
});

app.listen(port, () => {
    console.log(
      "Server started on port " + port
    );
});