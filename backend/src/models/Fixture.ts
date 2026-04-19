import mongoose, { Schema, Document } from 'mongoose';

export interface IFixture extends Document {
  name: string;
  match_type: string;
  date: string; // or Date
  time: string;
  stadium: string;
  competitor_logo?: string;
}

const FixtureSchema: Schema = new Schema({
  name: { type: String, required: true },
  match_type: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  stadium: { type: String, required: true },
  competitor_logo: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<IFixture>('Fixture', FixtureSchema);
