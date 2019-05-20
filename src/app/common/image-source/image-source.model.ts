import { Schema } from 'mongoose';

export interface ImageSource {
  s?: string;
  m?: string;
  l?: string;
}

export const imageSourceSchema = new Schema(
  {
    s: {
      type: String,
      trim: true
    },
    m: {
      type: String,
      trim: true
    },
    l: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);
