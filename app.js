const { isValidNumber } = require("./controllers/handle");
const qrcode = require("qrcode-terminal");
const { saveMessageJson } = require("./adapter/jsonDb");
const { responseMessage } = require("./response/responseMessage");
const { Client } = require("whatsapp-web.js");
const cors = require("cors");
const fs = require("fs");

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", require("./routes/web"));

const server = require("http").Server(app);
const client = new Client();

const port = process.env.PORT || 3000;

client.on("qr", (qr) => {
  let qr_svg = require("qr-image").image(qr, { type: "svg", margin: 4 });
  qr_svg.pipe(fs.createWriteStream("./mediaSend/qr-code.svg"));
  qrcode.generate(qr, { small: true });
  console.log(`Ver QR http://localhost:${port}/qr`);
  socketEvents.sendQR(qr);
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
