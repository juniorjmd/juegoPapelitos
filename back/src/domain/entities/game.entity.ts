import type { GameGenre, IGame } from "../../interfaces/game.interface";

export class GameEntity implements IGame {
    id: string;
    title: string;
    genre: GameGenre;
    isActive: boolean;
    startDate: Date;
    endDate?: Date;

    constructor(id: string, title: string, isActive: boolean, genre: GameGenre) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.isActive = isActive;
        this.startDate = new Date();
    }
    
    static fromInterface(i: IGame) {
        const game = new GameEntity(i.id, i.title, i.isActive, i.genre);
        game.startDate = i.startDate;
        game.endDate = i.endDate!;
        return game;
    }
}
