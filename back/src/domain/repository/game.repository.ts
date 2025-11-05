import type { IGame } from "../../interfaces/game.interface";
import type { UserSelectedDto } from "../dto/users/UserSelectedDto";
import type { GameEntity } from "../entities/game.entity";

export abstract class GameRepository {
    abstract createGame(gameData: IGame): Promise<GameEntity>;
    abstract getGames(): Promise<GameEntity[]>; 
    abstract updateGame(gameId: string, updateData: Partial<IGame>): Promise<void>;
    abstract deactivateGame(gameId: string): Promise<void>;
    abstract getAvailablePlayersByGame(gameId: string): Promise<UserSelectedDto[]>;
}