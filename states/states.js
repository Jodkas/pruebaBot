function sendMyMessage(client, number, myMessage) {
  for (let msg of myMessage) {
    setTimeout(() => {
      client.sendMessage(number, msg.join(""));
      console.log("LAALALALAL");
    }, 1000);
  }
}

const goState = async (client, number, name, message, state) => {
  let newState;
  let myMessage;
  let err;
  switch (state) {
    case 0:
      myMessage = [[`Hola ${name}! Bienvenido \n`, "Elegi la opcion a, b o c"]];
      newState = 1;
      sendMyMessage(client, number, myMessage);
      break;
    case 1:
      switch (message) {
        case "a":
          myMessage = [
            [
              "Consultas\n",
              "a-Productos \n",
              "b-lista de precios \n",
              "c-costos de envios \n",
              "d-horarios \n",
              "e-otras sucursales \n",
              "f-mi pedido tarda en llegar \n",
              "g-volver",
            ],
          ];
          newState = 2;
          sendMyMessage(client, number, myMessage);

          break;
        case "b":
          myMessage = [
            ["pedido \n", "procure estar dentro de la zona de envio"],
            ["Elegi la opcion a, b o c"],
          ];
          newState = 1;
          sendMyMessage(client, number, myMessage);

          break;
        case "c":
          myMessage = [
            [
              "Subiendo la foto con tu helado y etiquetandonos apareceras en nuestras historias",
            ],
            ["Elegi la opcion a, b o c"],
          ];
          newState = 1;
          break;
        default:
          newState = 1;
          err = "Mensaje no coincide";
      }
      break;
    case 2:
      switch (message) {
        case "a":
          newState = 5;
          break;
        case "b":
          myMessage = [
            [
              "lista de precios \n",
              "a-lista de sabores \n",
              "b-cannolis y especialidades \n",
              "c-postres helados \n",
              "d-volver",
            ],
          ];
          newState = 6;
          sendMyMessage(client, number, myMessage);

          break;
        case "c":
          newState = 1;
          break;
        case "d":
          newState = 7;
          break;
        case "e":
          newState = 1;
          break;
        case "f":
          newState = 8;
          break;
        default:
          newState = 1;
          err = "Mensaje no coincide";
      }
      break;
    default:
  }
  return [newState, myMessage, err];
};

module.exports = { goState };
