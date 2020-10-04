import { atom } from 'recoil';
import { StockProps } from './Setting/KRStock/Presenter';

export const krStockState = atom({
  key: 'KrStockState',
  default: [] as StockProps[],
});
