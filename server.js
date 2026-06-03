const express = require("express");
const path = require("path");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.json());

let dernierePosition = {
  latitude: 51.018471,
  longitude: 2.355795
};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "map.html"));
});

app.post("/api/ttn", (req, res) => {
  console.log("Message TTN reçu !");
  console.log(req.body);

  const payload = req.body?.uplink_message?.decoded_payload;

  if (payload && payload.latitude && payload.longitude) {
    dernierePosition = {
      latitude: payload.latitude,
      longitude: payload.longitude
    };

    console.log("Position mise à jour :", dernierePosition);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(dernierePosition));
      }
    });
  }

  res.status(200).send("OK");
});

wss.on("connection", (ws) => {
  console.log("Client WebSocket connecté");
  ws.send(JSON.stringify(dernierePosition));
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Serveur lancé sur port " + PORT);
});