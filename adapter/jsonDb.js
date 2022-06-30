const Path = require("path");
const StormDB = require("stormdb");
const date = new Date().toISOString();
const { goState } = require("../states/states.js");

const saveMessageJson = (client, message, number, name) =>
  new Promise(async (resolve, reject) => {
    try {
      const engine = new StormDB.localFileEngine(
        Path.join(__dirname, `/../chats/${number}.json`)
      );
      const db = new StormDB(engine);
      // set default db value if db is empty
      db.default({ name: name, messages: [], currentState: 0 });
      // calcular a que state ir
      //db.get("oldState").set(db.get("currentState").value());
      let state = await goState(
        client,
        number,
        name,
        message,
        db.get("currentState").value()
      );
      let myMessage = state[1];
      console.log(state[0]);
      db.get("currentState").set(state[0]);
      // add new users entry
      db.get("messages").push({ message, date });
      db.get("messages").push({ myMessage, date });
      db.get("name").set(name);
      db.save();
      resolve("Saved");
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

module.exports = { saveMessageJson };
