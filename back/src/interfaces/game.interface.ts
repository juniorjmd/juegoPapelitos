import type { IPlayer } from "./player.interface";

export interface IGame {
    id: string;
    title: string;
    genre: GameGenre;
    isActive: boolean;
    startDate: Date;
    endDate?: Date;
    players?: IPlayer[];
}

export type GameGenre = 'adult' | 'kids' | 'all';