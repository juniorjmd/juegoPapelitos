import {   Router } from "express"; 
import { UsersController } from './controller.js';  
import { get } from "http";

 
export class UsersRoutes {
   static get routes(): Router {
    const router = Router();
    const { getUsers, createUser , getUsersByType} = new UsersController();
    router.get('/', getUsers);
    router.get('/type/:type', getUsersByType);
    router.post('/', createUser);
    return router;
   }


}