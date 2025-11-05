import { PlayerImplRepository } from '../../infrastructure/repositories/player-impl.repository.js';
import { MongoPlayerDatasource } from '../../infrastructure/datasources/mongo-player.datasource.js';

export class  PlayerController {
  readonly playerRepo = new PlayerImplRepository(new MongoPlayerDatasource());

    public  getplayer = async (req:any, res:any) => {
       try {
      const players = await this.playerRepo.getPlayer();
      res.json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting players' });
    }
    } 
    public createplayer = async (req:any, res:any) => {
        const player = await  this.playerRepo.createPlayer(req.body);
        res.json(player);

    }
    public updateplayer = async (req: any, res: any) => {
      const { playerId } = req.params;
      const updateData = req.body;
        return this.playerRepo.updatePlayer(playerId, updateData);
    }
    public deactivateplayer(playerId: string) {
        return this.playerRepo.deactivatePlayer
    }    


}