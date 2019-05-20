import { Document, model, Schema } from 'mongoose';

export interface Promotion {
  id?: string;
  description: string;
  imgSrc: string;
  link: string;
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

export interface PromotionDocument extends Promotion, Document {
  id: string;
}

const promotionSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true
    },
    imgSrc: {
      type: String,
      required: true,
      trim: true
    },
    link: {
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
  { timestamps: true }
);

export const PromotionModel = model<PromotionDocument>(
  'promotion',
  promotionSchema
);
