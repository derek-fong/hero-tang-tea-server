import { Document, model, Schema } from 'mongoose';

import { nameSchema, Name } from '../../common/name/name.model';
import { Drink } from '../../drinks/models/drink.model';

export interface DrinkCategory {
  id: string;
  name: Name;
  description: string;
  drinks?: Drink[];
  createdAt: string | Date;
  createdBy: string;
  updatedAt: string | Date;
  updatedBy: string;
  releasedAt?: string | Date;
  releasedBy?: string;
  suspendedAt?: string | Date;
  suspendedBy?: string;
  retiredAt?: string | Date;
  retiredBy?: string;
}

export interface DrinkCategoryDocument extends DrinkCategory, Document {
  id: string;
}

const drinkCategorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },
    name: {
      type: nameSchema,
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      required: true
    },
    updatedBy: {
      type: String,
      required: true
    },
    releasedAt: Date,
    releasedBy: String,
    suspendedAt: Date,
    suspendedBy: String,
    retiredAt: Date,
    retiredBy: String
  },
  { collection: 'drinkCategories', id: false, timestamps: true }
);

export const DrinkCategoryModel = model<DrinkCategoryDocument>(
  'drinkCategory',
  drinkCategorySchema
);
