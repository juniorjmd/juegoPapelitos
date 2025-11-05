import mongoose, { model, Model, Schema } from "mongoose";
import type { IGame } from "../../interfaces/game.interface";

const gameSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
}, {
    versionKey: false
});

const GameModel: Model<IGame> = mongoose.models.games || model<IGame>('Games', gameSchema);

export default GameModel;