import type { IPlayer } from "../../interfaces/player.interface";
import type { PlayerEntity } from "../entities"; 


export abstract class PlayerDatasource { 
    abstract createPlayer(playerData: IPlayer): Promise<PlayerEntity>;
    abstract getPlayer(): Promise<PlayerEntity[]>; 
    abstract getPlayerByUserAndGame(user:string , game:string): Promise<PlayerEntity|null>; 
    abstract updatePlayer(playerId: string, updateData:Partial<IPlayer>): Promise<void>;
    abstract deactivatePlayer(playerId: string): Promise<PlayerEntity|null>;
}