


import type { GameRepository } from "../../domain/repository/game.repository.js"; 
import { GameDatasource } from '../../domain/datasources/game.datasource.js';
import type { IGame } from "../../interfaces/game.interface.js";
import type { GameEntity } from "../../domain/entities/game.entity.js";
import type { UserSelectedDto } from "../../domain/dto/users/UserSelectedDto.js";

export class GameImplRepository implements GameRepository {
    constructor(private readonly gameDatasource: GameDatasource) {}
    getAvailablePlayersByGame(gameId: string): Promise<UserSelectedDto[]> {
        return this.gameDatasource.getAvailablePlayersByGame(gameId);
    }

    createGame(gameData: IGame): Promise<GameEntity> {
        return this.gameDatasource.createGame(gameData);
    }
    getGames(): Promise<GameEntity[]> {
        return this.gameDatasource.getGames();
    } 
    updateGame(gameId: string, updateData: Partial<IGame>): Promise<void> {
        return this.gameDatasource.updateGame(gameId, updateData);
    }
    deactivateGame(gameId: string): Promise<void> {
        return this.gameDatasource.deactivateGame(gameId);
    }
}
