import { atom, selector } from 'recoil';
import { StockProps } from '../types';
import { getPercentage } from '../utils';

export const krStockState = atom({
  key: 'KrStockState',
  default: [] as StockProps[],
});

export const krStockStateWithRatio = selector({
  key: 'KrStockWithRatio',
  get: ({ get }) => {
    const stocks = get(krStockState);
    const total = stocks.reduce((sum, stock) => sum + stock.currentPrice, 0);
    return stocks.map(stock => ({
      ...stock,
      ratio: getPercentage(stock.currentPrice, total),
    }));
  },
});

export const krStockSummary = selector({
  key: 'KrStockSummary',
  get: ({ get }) => {
    const stocks = get(krStockState);
    return {
      current: stocks.reduce(
        (sum, item) => sum + item.count * item.currentPrice,
        0,
      ),
      average: stocks.reduce(
        (sum, item) => sum + item.count * item.averagePrice,
        0,
      ),
    };
  },
});
export const usdStockState = atom({
  key: 'usdStockState',
  default: [] as StockProps[],
});
