import { model, Schema } from 'mongoose';

type Coords = {
  longitude: number | string
  latitude: number | string
}

type FeedbackModel = {
  message: string;
  coords?: Coords;
};

const feedbackSchema = new Schema<FeedbackModel>(
  {
    message: String,
    coords: Object
  },
  {
    strict: true,
  }
);

export const Feedback = model<FeedbackModel>('feedback', feedbackSchema);
