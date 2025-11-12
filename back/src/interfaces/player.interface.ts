export interface IPlayer {
    id: string;
    _id?: string;
    user: string;
    game: string;
    friend?: string;
    isActive: boolean;
}