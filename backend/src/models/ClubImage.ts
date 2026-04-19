import mongoose, { Schema, Document } from 'mongoose';

export interface IClubImage extends Document {
  url: string;
  caption?: string;
  category: 'slider' | 'other';
}

const ClubImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  caption: { type: String },
  category: { type: String, enum: ['slider', 'other'], default: 'slider' }
}, {
  timestamps: true
});

export default mongoose.model<IClubImage>('ClubImage', ClubImageSchema);
