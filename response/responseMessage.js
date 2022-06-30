const Path = require("path");
const StormDB = require("stormdb");
const stepsResponse = require("../response/response.json");
const date = new Date().toISOString();
const myMessage = true;

const responseMessage = (client, number) =>
  new Promise(async (resolve, reject) => {
    try {
      const engine = new StormDB.localFileEngine(
        Path.join(__dirname, `/../chats/${number}.json`)
      );
      const db = new StormDB(engine);
      const message =
        stepsResponse[db.get("currentState").value()].responseMessage.join("");
      const messageArray =
        stepsResponse[db.get("currentState").value()].responseMessage;

      //Guardar mensaje como enviado
      db.get("messages").push({ myMessage, messageArray, date });
      db.save();

      client.sendMessage(number, message);
      resolve("Respuesta enviada");
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

module.exports = { responseMessage };
