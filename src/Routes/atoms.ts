import { atom } from 'recoil';
import { StockProps } from '../types';

export const krStockState = atom({
  key: 'KrStockState',
  default: [] as StockProps[],
});

export const usdStockState = atom({
  key: 'usdStockState',
  default: [] as StockProps[],
});
