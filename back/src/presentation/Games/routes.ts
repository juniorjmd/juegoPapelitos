import {   Router } from "express"; 
import { GamesController } from './controller.js';  

 
export class GamesRoutes {
   static get routes(): Router {
    const router = Router();
    const { getGame, createGame , getAvailablePlayersByGame } = new GamesController();
    router.get('/', getGame);
    router.get('/:idGame', getAvailablePlayersByGame);
    router.post('/', createGame); 
    return router;
   }


}