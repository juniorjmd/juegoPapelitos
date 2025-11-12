import PlayerModel from "../../database/models/player.js";
import { PlayerDatasource } from "../../domain/datasources/player.datasource.js";
import { PlayerEntity } from "../../domain/entities/player.entity.js";
import type { IPlayer } from "../../interfaces/player.interface.js";


export class MongoPlayerDatasource implements PlayerDatasource {
    async createPlayer(playerData: IPlayer): Promise<PlayerEntity> {
        try {
            console.log('datos a guardar ', playerData)
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
    async getPlayerByUserAndGame(user: string, game: string): Promise<PlayerEntity | null> {
        const data = await PlayerModel.findOne({ user, game })
            .populate('user', 'username email')
            .populate('game', 'title genre')
            .lean();
        if (!data) return null;

        return PlayerEntity.fromInterface(data);

    }
    async updatePlayer(playerId: string, updateData: Partial<IPlayer>): Promise<void> {
        const playerData = await PlayerModel.findByIdAndUpdate(playerId, updateData);
        if (!playerData) {
            throw new Error("Game not found");
        }
    }
    async deactivatePlayer(playerId: string): Promise<PlayerEntity|null> {
        const playerData = await PlayerModel.findByIdAndDelete(playerId);
        if (!playerData) {
            throw new Error("Player not found");
        } 
        return PlayerEntity.fromInterface(playerData);
    }



}