import mongoose, { model, Model, Schema } from "mongoose";
import type { IGame } from "../../interfaces/game.interface";

const gameSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date }, 
}, {
    versionKey: false
});

gameSchema.virtual('players', {
  ref: 'Player',            // Modelo relacionado
  localField: '_id',         // Campo local en Game
  foreignField: 'game'      // Campo en Player que referencia al Game
});


gameSchema.set('toObject', { virtuals: true });
gameSchema.set('toJSON', { virtuals: true });
const GameModel: Model<IGame> = mongoose.models.games || model<IGame>('Games', gameSchema);

export default GameModel;