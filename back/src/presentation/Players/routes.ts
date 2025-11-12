import {   Router } from "express"; 
import { PlayerController } from './controller.js';  

 
export class PlayerRoutes {
   static get routes(): Router {
    const router = Router();
    const { getplayer,createplayer , createplayers } = new  PlayerController();
    router.get('/', getplayer);
    router.post('/', createplayer);
    router.post('/:idGame', createplayers);
    return router;
   }


}