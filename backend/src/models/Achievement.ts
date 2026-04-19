import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  year: string;
  title: string;
  desc: string;
  icon: string;
  color: string;
}

const AchievementSchema: Schema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, default: '🏆' },
  color: { type: String, default: 'from-blue-400 to-blue-600' }
}, {
  timestamps: true
});

export default mongoose.model<IAchievement>('Achievement', AchievementSchema);
