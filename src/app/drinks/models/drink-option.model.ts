import { Schema } from 'mongoose';

export interface DrinkOption {
  iceRatio: boolean;
  size: boolean;
  sugarRatio: boolean;
  teaType: boolean;
  topping: boolean;
}

export const drinkOptionSchema = new Schema(
  {
    iceRatio: {
      type: Boolean,
      required: true
    },
    size: {
      type: Boolean,
      required: true
    },
    sugarRatio: {
      type: Boolean,
      required: true
    },
    teaType: {
      type: Boolean,
      required: true
    },
    topping: {
      type: Boolean,
      required: true
    }
  },
  { _id: false }
);
