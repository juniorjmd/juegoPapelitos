import { GameImplRepository } from '../../infrastructure/repositories/game-impl.repository.js';
import { MongoGameDatasource } from '../../infrastructure/datasources/mongo-game.datasource.js';

export class GamesController {
  readonly GameRepo = new GameImplRepository(new MongoGameDatasource());

  public getGame = async (req: any, res: any) => {
    try {
      const games = await this.GameRepo.getGames();
      res.json(games);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting games' });
    }



  }

  public getAvailablePlayersByGame = async (req: any, res: any) => {
    try {
      const { idGame } = req.params;
      const players = await this.GameRepo.getAvailablePlayersByGame(idGame);
      res.json(players);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting games' });
    }
  }







  public createGame = async (req: any, res: any) => {
    const game = await this.GameRepo.createGame(req.body);
    res.json(game);

  }
  public updateGame = async (req: any, res: any) => {
    const { gameId } = req.params;
    const updateData = req.body;
    return this.GameRepo.updateGame(gameId, updateData);
  }
  public deactivateGame(gameId: string) {
    return this.GameRepo.deactivateGame
  }


}