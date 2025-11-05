import type { PlayerDatasource } from "../../domain/datasources/player.datasource";
import type { PlayerEntity } from "../../domain/entities";
import type { PlayerRepository } from "../../domain/repository/player.repository";
import type { IPlayer } from "../../interfaces/player.interface";


export class PlayerImplRepository implements PlayerRepository {
    constructor(private readonly playerDatasource: PlayerDatasource) {}

    createPlayer(playerData: IPlayer): Promise<PlayerEntity> {
        return this.playerDatasource.createPlayer(playerData);
    }
    getPlayer(): Promise<PlayerEntity[]> {
        return this.playerDatasource.getPlayer();
    } 
    updatePlayer(playerId: string, updateData: Partial<IPlayer>): Promise<void> {
        return this.playerDatasource.updatePlayer(playerId, updateData);
    }
    deactivatePlayer(playerId: string): Promise<void> {
        return this.playerDatasource.deactivatePlayer(playerId);
    }
} 