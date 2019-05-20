import { Schema } from 'mongoose';

export interface DrinkPrice {
  cold: number;
  hot: number;
}

export const drinkPriceSchema = new Schema(
  {
    cold: {
      type: Number,
      min: 0
    },
    hot: {
      type: Number,
      min: 0
    }
  },
  { _id: false }
);
