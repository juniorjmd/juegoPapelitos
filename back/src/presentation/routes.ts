import { Router } from "express";  
import { UsersRoutes } from "./Users/routes.js";
import { GamesRoutes } from "./Games/routes.js";
import { PlayerRoutes } from "./Players/routes.js";

export default class Routes {
    static get routes() {
        const router = Router(); 
        router.use('/api/users', UsersRoutes.routes);
        router.use('/api/games', GamesRoutes.routes);
        router.use('/api/players', PlayerRoutes.routes);
        return router; 
    }
}   