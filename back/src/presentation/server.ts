import express from 'express';
import cors from 'cors';
import { connect } from '../database/index.js';
import Routes from './routes.js'; 


export class Server {
    public readonly app = express();
    private readonly port: number; 

    constructor() {
        this.port = Number(process.env.PORT) || 3000;  
        this.app.use(cors());
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
 

