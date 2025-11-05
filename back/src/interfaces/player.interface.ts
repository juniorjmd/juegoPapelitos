export interface IPlayer {
    id: string;
    user: string;
    game: string;
    friend?: string;
    isActive: boolean;
}