import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';
import colors from 'colors';

const { yellow } = colors;

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.generalRoute = '/api/';

    // Conectar a MongoDB
    this.conectarDBMongo();

    // Middlewares
    this.middlewares();

    // Rutas de la aplicación
    this.routes();
  }

  async conectarDBMongo() {
    if (!db.isConnected) {
      await db.conectarAMongoDB();
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  routes() {
    // Rutas de la API
    this.app.use(this.generalRoute, indexRoutes);

    // Ruta 404
    this.app.use(/.*/, (req, res) => {
      res.status(404).json({
        msg: 'Ruta no encontrada'
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(yellow(`Servidor corriendo en el puerto ${this.port} `));
    });
  }
}

