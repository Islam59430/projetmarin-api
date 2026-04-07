const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "map.html"));
});

app.post("/api/ttn", (req, res) => {
  console.log("Message TTN reçu !");
  console.log(req.body);

  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur port " + PORT);
});