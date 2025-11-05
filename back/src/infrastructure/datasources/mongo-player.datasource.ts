import PlayerModel from "../../database/models/player.js";
import { PlayerDatasource } from "../../domain/datasources/player.datasource.js";
import  { PlayerEntity } from "../../domain/entities/player.entity.js"; 
import type { IPlayer } from "../../interfaces/player.interface.js"; 


export class MongoPlayerDatasource implements PlayerDatasource {
     async createPlayer(playerData: IPlayer): Promise<PlayerEntity> {
         try {
            const data = await PlayerModel.create(playerData);
            return PlayerEntity.fromInterface(data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPlayer(): Promise<PlayerEntity[]> { 
        const games = await PlayerModel.find({}).populate('user', 'username email').populate('game', 'title genre'); 
        
        return games.map(PlayerEntity.fromInterface);
    }
    async updatePlayer(playerId: string, updateData: Partial<IPlayer>): Promise<void> {
        const playerData = await PlayerModel.findByIdAndUpdate(playerId, updateData);
        if (!playerData) {
            throw new Error("Game not found");
        }
    }
    async deactivatePlayer(playerId: string): Promise<void> {
       const playerData = await PlayerModel.findByIdAndDelete(playerId);
        if (!playerData) {
            throw new Error("Player not found");
        }
    }


    
}