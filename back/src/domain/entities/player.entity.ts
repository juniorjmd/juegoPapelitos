import type { IPlayer } from "../../interfaces/player.interface";

export class PlayerEntity implements IPlayer {
    id: string;
    user: string;
    game: string;
    friend: string;
    isActive: boolean;

    constructor(id: string,userId: string, gameId: string, isActive: boolean, friendId?: string) {
        this.id = id;
        this.user = userId;
        this.game = gameId;
        this.friend = friendId!;
        this.isActive = isActive;
    }
    
    static fromInterface(i: IPlayer) {
        const player = new PlayerEntity(i.id, i.user, i.game, i.isActive, i.friend);
        return player;
    }
}
