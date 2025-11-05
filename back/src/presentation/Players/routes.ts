import {   Router } from "express"; 
import { PlayerController } from './controller.js';  

 
export class PlayerRoutes {
   static get routes(): Router {
    const router = Router();
    const { getplayer,createplayer  } = new  PlayerController();
    router.get('/', getplayer);
    router.post('/', createplayer);
    return router;
   }


}