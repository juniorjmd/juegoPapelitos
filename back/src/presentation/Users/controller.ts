 
import { UserImplRepository } from '../../infrastructure/repositories/user-impl.repository.js';
import { MongoUserDatasource } from '../../infrastructure/datasources/mongo-user.datasource.js';

export class  UsersController {
  readonly UserRepo =  new UserImplRepository(new MongoUserDatasource());

    public  getUsers = async (req:any, res:any) => {
       try {
      const users = await this.UserRepo.getUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting users' });
    }
    }

    public  getUsersByType = async (req:any, res:any) => {
         try {
      const { type } = req.params;

      if (!type) {
        res.status(400).json({ message: 'Missing query parameter: type' });
        return;
      }

      const users = await this.UserRepo.getUsersByType(type as string);

      res.status(200).json(users);
    } catch (err) {
      console.error('❌ Error en getUsersByType:', err);
      res.status(500).json({ message: 'Error getting users' });
    }
  };
    
    public getUserByEmail(email: string) {
        return this.UserRepo.getUserByEmail(email);
    }
    public   createUser = async (req:any, res:any)=>  {
        const user = await  this.UserRepo.createUser(req.body);
        res.json(user);

    }
    public updateUser = async (userId: string, updateData: any) =>{
        return this.UserRepo.updateUser(userId, updateData);
    }
    public deactivateUser(userId: string) {
        return this.UserRepo.deactivateUser(userId);
    }    


}