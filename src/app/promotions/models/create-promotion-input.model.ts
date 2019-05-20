export interface CreatePromotionInput {
  id?: string;
  description: string;
  imgSrc: string;
  link: string;
  releasedAt?: string | Date;
  suspendedAt?: string | Date;
  retiredAt?: string | Date;
}
