import { DataPoint, Shop } from './types';
import { format, subDays, startOfWeek, startOfMonth } from 'date-fns';

export const SHOPS: Shop[] = [
  { id: 'shop_01', name: '树外旗舰店' },
  { id: 'shop_02', name: '简酷龙旗舰店' },
  { id: 'shop_03', name: '莱蓓旗舰店' },
];

const today = new Date();
const todayStr = format(today, 'yyyy-MM-dd');
const yesterdayStr = format(subDays(today, 1), 'yyyy-MM-dd');
const twoDaysAgoStr = format(subDays(today, 2), 'yyyy-MM-dd');

export const MOCK_DATA: DataPoint[] = [
  // Shop 1 - Today
  { linkId: 'L001', spend: 12000, roi: 3.5, clicks: 1200, impressions: 45000, conversions: 42, cart: 156, promotionType: 'site_wide', shopId: 'shop_01', date: todayStr },
  { linkId: 'L002', spend: 8500, roi: 4.2, clicks: 850, impressions: 32000, conversions: 35, cart: 98, promotionType: 'keyword', shopId: 'shop_01', date: todayStr },
  { linkId: 'L003', spend: 15000, roi: 2.8, clicks: 1500, impressions: 60000, conversions: 40, cart: 210, promotionType: 'audience', shopId: 'shop_01', date: todayStr },
  
  // Shop 1 - Yesterday
  { linkId: 'L001', spend: 13000, roi: 3.6, clicks: 1300, impressions: 48000, conversions: 45, cart: 168, promotionType: 'site_wide', shopId: 'shop_01', date: yesterdayStr },
  { linkId: 'L002', spend: 8000, roi: 4.0, clicks: 800, impressions: 30000, conversions: 32, cart: 85, promotionType: 'keyword', shopId: 'shop_01', date: yesterdayStr },
  { linkId: 'L004', spend: 5000, roi: 5.1, clicks: 500, impressions: 20000, conversions: 25, cart: 62, promotionType: 'content', shopId: 'shop_01', date: yesterdayStr },
  
  // Shop 2 - Today
  { linkId: 'L101', spend: 9000, roi: 3.8, clicks: 900, impressions: 35000, conversions: 34, cart: 112, promotionType: 'site_wide', shopId: 'shop_02', date: todayStr },
  { linkId: 'L102', spend: 11000, roi: 3.1, clicks: 1100, impressions: 42000, conversions: 33, cart: 125, promotionType: 'keyword', shopId: 'shop_02', date: todayStr },
  
  // Shop 2 - Yesterday
  { linkId: 'L103', spend: 7000, roi: 4.5, clicks: 700, impressions: 25000, conversions: 31, cart: 88, promotionType: 'audience', shopId: 'shop_02', date: yesterdayStr },
  
  // Older data
  { linkId: 'L005', spend: 20000, roi: 1.9, clicks: 2000, impressions: 80000, conversions: 38, cart: 245, promotionType: 'content', shopId: 'shop_01', date: twoDaysAgoStr },
  { linkId: 'L001', spend: 11000, roi: 3.2, clicks: 1100, impressions: 40000, conversions: 38, cart: 140, promotionType: 'site_wide', shopId: 'shop_01', date: twoDaysAgoStr },
  { linkId: 'L002', spend: 9000, roi: 3.8, clicks: 900, impressions: 34000, conversions: 30, cart: 90, promotionType: 'keyword', shopId: 'shop_01', date: twoDaysAgoStr },
  { linkId: 'L001', spend: 10500, roi: 3.0, clicks: 1050, impressions: 38000, conversions: 35, cart: 130, promotionType: 'site_wide', shopId: 'shop_01', date: format(subDays(today, 3), 'yyyy-MM-dd') },
  { linkId: 'L001', spend: 11500, roi: 3.4, clicks: 1150, impressions: 42000, conversions: 40, cart: 150, promotionType: 'site_wide', shopId: 'shop_01', date: format(subDays(today, 4), 'yyyy-MM-dd') },
  { linkId: 'L001', spend: 12500, roi: 3.7, clicks: 1250, impressions: 46000, conversions: 44, cart: 160, promotionType: 'site_wide', shopId: 'shop_01', date: format(subDays(today, 5), 'yyyy-MM-dd') },
];

export const PRODUCT_LIBRARY = [
  {
    category: '泳池',
    products: [
      { id: 'p1', name: '全自动充气泳池', image: 'https://picsum.photos/seed/pool1/200/200' },
      { id: 'p2', name: '加厚折叠泳池', image: 'https://picsum.photos/seed/pool2/200/200' },
      { id: 'p3', name: '儿童遮阳泳池', image: 'https://picsum.photos/seed/pool3/200/200' },
    ]
  },
  {
    category: '泳圈',
    products: [
      { id: 'p4', name: '独角兽坐骑泳圈', image: 'https://picsum.photos/seed/ring1/200/200' },
      { id: 'p5', name: '火烈鸟充气浮排', image: 'https://picsum.photos/seed/ring2/200/200' },
      { id: 'p6', name: '婴儿遮阳腋下圈', image: 'https://picsum.photos/seed/ring3/200/200' },
    ]
  },
  {
    category: '皮划艇',
    products: [
      { id: 'p7', name: '双人加厚皮划艇', image: 'https://picsum.photos/seed/boat1/200/200' },
      { id: 'p8', name: '专业竞技充气船', image: 'https://picsum.photos/seed/boat2/200/200' },
    ]
  },
  {
    category: '床垫',
    products: [
      { id: 'p9', name: '车载充气床垫', image: 'https://picsum.photos/seed/bed1/200/200' },
      { id: 'p10', name: '户外露营防潮垫', image: 'https://picsum.photos/seed/bed2/200/200' },
    ]
  },
  {
    category: '泡澡桶',
    products: [
      { id: 'p11', name: '折叠成人泡澡桶', image: 'https://picsum.photos/seed/tub1/200/200' },
      { id: 'p12', name: '恒温加热洗澡桶', image: 'https://picsum.photos/seed/tub2/200/200' },
    ]
  },
  {
    category: '洗脚桶',
    products: [
      { id: 'p13', name: '全自动按摩足浴桶', image: 'https://picsum.photos/seed/foot1/200/200' },
      { id: 'p14', name: '折叠便携洗脚盆', image: 'https://picsum.photos/seed/foot2/200/200' },
    ]
  },
];
