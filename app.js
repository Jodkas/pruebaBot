const { isValidNumber } = require("./controllers/handle");
const qrcode = require("qrcode-terminal");
const { saveMessageJson } = require("./adapter/jsonDb");
const { responseMessage } = require("./response/responseMessage");
const { Client } = require("whatsapp-web.js");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
const server = require("http").Server(app);
const client = new Client();

const port = process.env.PORT || 3000;

console.log("anashe");

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (msg) => {
  const { from, body } = msg;

  if (!isValidNumber(from)) {
    return;
  }
  if (from === "status@broadcast") {
    return;
  }

  message = body.toLowerCase();
  console.log("Texto del mensaje", message);
  const number = from;
  const name = msg._data.notifyName;

  // Guarda el mensaje en base de datos JSON
  await saveMessageJson(client, message, number, name);
  //Responde al mensaje
  //await responseMessage(client, from);

  console.log(`Mensaje de ${name}: "${body}"`);
});

client.initialize();
server.listen(port, () => {
  console.log(`El server esta listo por el puerto ${port}`);
});
