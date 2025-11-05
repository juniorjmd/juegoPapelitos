import GameModel from "../../database/models/game.js";
import UserModel from "../../database/models/user.js";
import type { GameDatasource } from "../../domain/datasources/game.datasource.js";
import  { UserSelectedDto } from "../../domain/dto/users/UserSelectedDto.js";
import   { GameEntity } from "../../domain/entities/game.entity.js";
import type { IGame, GameGenre } from "../../interfaces/game.interface.js";

 



export class MongoGameDatasource implements GameDatasource {
   
    async createGame(gameData: IGame): Promise<GameEntity> {
         try {
            const data = await GameModel.create(gameData);
            return GameEntity.fromInterface(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getGames(): Promise<GameEntity[]> { 
        const games = await GameModel.find({}); 
        return games.map(GameEntity.fromInterface);
    }
    async updateGame(gameId: string, updateData: { title: string; genre: GameGenre; isActive: boolean; startDate: Date; }): Promise<void> {
        const gameData = await GameModel.findByIdAndUpdate(gameId, updateData);
        if (!gameData) {
            throw new Error("Game not found");
        }
    }
    async deactivateGame(gameId: string): Promise<void> {
       const gameData = await GameModel.findByIdAndDelete(gameId);
        if (!gameData) {
            throw new Error("Game not found");
        }
    }

    async getAvailablePlayersByGame(gameId: string): Promise<UserSelectedDto[]> { 
        
         const game = await GameModel.findById(gameId).populate('players'); 
         if (!game) {
            throw new Error("Game not found");
        }
        const isAdult = game.genre === 'adult';
           console.log(game); 
const users = await UserModel.find({ isActive: true ,isAdult });

          const assignedIds = (game.players || []).map((p: any) => p.id.toString());
           
          
const dto: UserSelectedDto[] = users.map(user => {
    const isSelected = assignedIds.includes(user.id.toString());
    return new UserSelectedDto(user.id, user.name, user.email, isSelected);
  });

         
      
        
        return dto;

    }

    
}