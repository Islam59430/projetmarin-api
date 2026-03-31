const express = require("express");
const app = express();

app.use(express.json());

// Route webhook TTN
app.post("/api/ttn", (req, res) => {
    console.log("Message TTN reçu !");
    console.log(req.body);

    res.status(200).send("OK");
});

// Test serveur
app.get("/", (req, res) => {
    res.send("Serveur projet marin actif");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Serveur lancé sur port " + PORT);
});