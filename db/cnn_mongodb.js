import colors from "colors";
const { green, red, yellow } = colors;
import mongoose from "mongoose";

let isConnected = false;

const conectarAMongoDB = async () => {
  if (isConnected) {
    console.log(yellow("Ya estás conectado a MongoDB!"));
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(green(" Conectado a MongoDB"));
  } catch (error) {
    console.log(red(" Error al conectar a MongoDB:", error));
  }
};

const db = mongoose.connection;

db.on("error", (error) => {
  isConnected = false;
  console.log(red("Error en la conexión a MongoDB:", error));
});

db.once("open", () => {
  isConnected = true;
});

db.on("disconnected", () => {
  isConnected = false;
  console.log(red("Desconectado de MongoDB"));
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log(yellow("MongoDB desconectado"));
  process.exit(0);
});

export { conectarAMongoDB, isConnected };

