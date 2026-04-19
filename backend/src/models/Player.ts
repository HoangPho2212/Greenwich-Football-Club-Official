import mongoose, { Schema, Document } from 'mongoose';

export interface IPlayer extends Document {
  name: string;
  number?: number;
  age?: number;
  position: string;
  role?: string;
  joined_year?: number;
  profile_photo?: string;
  category: 'player' | 'non-player';
}

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  number: { type: Number },
  age: { type: Number },
  position: { type: String, required: true },
  role: { type: String },
  joined_year: { type: Number },
  profile_photo: { type: String },
  category: { type: String, enum: ['player', 'non-player'], default: 'player' }
}, {
  timestamps: true
});

export default mongoose.model<IPlayer>('Player', PlayerSchema);
