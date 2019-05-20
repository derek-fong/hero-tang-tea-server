import { Schema } from 'mongoose';

export interface Name {
  enAU?: string;
  zhHans?: string;
  zhHant?: string;
}

export const nameSchema = new Schema(
  {
    enAU: {
      type: String,
      trim: true
    },
    zhHans: {
      type: String,
      trim: true
    },
    zhHant: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);
