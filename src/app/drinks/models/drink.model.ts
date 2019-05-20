import { Document, model, Schema } from 'mongoose';

import { drinkOptionSchema, DrinkOption } from './drink-option.model';
import { drinkPriceSchema, DrinkPrice } from './drink-price.schema';
import {
  imageSourceSchema,
  ImageSource
} from '../../common/image-source/image-source.model';
import { nameSchema, Name } from '../../common/name/name.model';
import { DrinkCategory } from '../../drink-categories/models/drink-category.model';

export interface Drink {
  id: string;
  name: Name;
  description: string;
  imgSrc: ImageSource;
  option: DrinkOption;
  price: DrinkPrice;
  drinkCategory?: DrinkCategory;
  isRecommended: boolean;
  keywords: string[];
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

export interface DrinkDocument extends Drink, Document {
  id: string;
}

const drinkSchema = new Schema(
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
      trim: true,
      required: true
    },
    imgSrc: {
      type: imageSourceSchema,
      required: true
    },
    option: {
      type: drinkOptionSchema,
      required: true
    },
    price: {
      type: drinkPriceSchema,
      required: true
    },
    drinkCategoryId: {
      type: String,
      trim: true
    },
    isRecommended: {
      type: Boolean,
      required: true
    },
    keywords: {
      type: [{ type: String, lowercase: true, trim: true }],
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
  { id: false, timestamps: true, toObject: { virtuals: true } }
);

drinkSchema.virtual('drinkCategory', {
  ref: 'drinkCategory',
  localField: 'drinkCategoryId',
  foreignField: 'id',
  justOne: true
});

export const DrinkModel = model<DrinkDocument>('drink', drinkSchema);
