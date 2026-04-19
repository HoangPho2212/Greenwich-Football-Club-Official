import mongoose, { Schema, Document } from 'mongoose';

export interface IHomeContent extends Document {
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  heroImage: string;
  welcomeTitle: string;
  welcomeDescription: string;
}

const HomeContentSchema: Schema = new Schema({
  heroTitle: { type: String, default: 'GRE FC DOMINANCE.' },
  heroSubtitle: { type: String, default: '4-Time Honor Club' },
  heroDescription: { type: String, default: 'Niềm đam mê sân cỏ, tinh thần đồng đội và khát vọng chiến thắng. Chúng tôi là biểu tượng của sức mạnh Greenwich.' },
  heroImage: { type: String, default: '/uploads/img/Gre Club.jpg' },
  welcomeTitle: { type: String, default: 'Welcome to GreFC' },
  welcomeDescription: { type: String, default: 'Check out our latest fixtures and news.' }
}, {
  timestamps: true
});

export default mongoose.model<IHomeContent>('HomeContent', HomeContentSchema);
