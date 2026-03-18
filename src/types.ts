export type PromotionType = 'all' | 'site_wide' | 'keyword' | 'audience' | 'content';

export interface DataPoint {
  linkId: string;
  spend: number;
  roi: number;
  clicks: number;
  impressions: number;
  conversions: number;
  cart: number;
  promotionType: PromotionType;
  shopId: string;
  date: string;
}

export interface Shop {
  id: string;
  name: string;
}
