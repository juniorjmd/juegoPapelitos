import mongoose, { model, Model, Schema } from "mongoose";
import type { IPlayer } from "../../interfaces/player.interface";

const playerSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    game: { type: Schema.Types.ObjectId, ref: 'Games', required: true },
    friend: { type: Schema.Types.ObjectId, ref: 'User' },
    isActive: { type: Boolean, default: true },
}, {
    versionKey: false
});

const PlayerModel: Model<IPlayer> = mongoose.models.Player || model<IPlayer>('Player', playerSchema);

export default PlayerModel;