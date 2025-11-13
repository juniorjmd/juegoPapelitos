import express from 'express';
import cors from 'cors';
import { connect } from '../database/index.js';
import Routes from './routes.js'; 


export class Server {
    public readonly app = express();
    private readonly port: number; 

    constructor() {
        this.port = Number(process.env.PORT) || 3000;  
            const allowedOrigins = [
                'http://localhost:3000', // tu front local
                'http://localhost:3001', // si tu front corre en 3001
                'https://juegopapelitos.com', // dominio de producción
                'https://meek-biscotti-0c4c7c.netlify.app', // si usas Netlify
    ];

    this.app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`CORS bloqueado: ${origin}`));
        }
      },
      credentials: true, // si manejas cookies o auth headers
    }));




        this.app.use(express.json());
        this.app.use(Routes.routes);
    }

    async connectionDB() {
        await connect();
    }

    async start() {

        await this.connectionDB();
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
 

