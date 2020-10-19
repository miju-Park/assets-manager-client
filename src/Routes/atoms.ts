import { atom, selector } from 'recoil';
import { SavingProps, StockProps } from '../types';
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
export const exchangeRateState = atom({
  key: 'exchangeRateState',
  default: 1,
});
export const usdStockStateWithRatio = selector({
  key: 'USDStockWithRatio',
  get: ({ get }) => {
    const stocks = get(usdStockState);
    const total = stocks.reduce((sum, stock) => sum + stock.currentPrice, 0);
    return stocks.map(stock => ({
      ...stock,
      ratio: getPercentage(stock.currentPrice, total),
    }));
  },
});

export const usdStockSummary = selector({
  key: 'USDStockSummary',
  get: ({ get }) => {
    const stocks = get(usdStockState);
    const exchangeRate = get(exchangeRateState);
    return {
      current: stocks.reduce(
        (sum, item) => sum + item.count * item.currentPrice * exchangeRate,
        0,
      ),
      average: stocks.reduce(
        (sum, item) => sum + item.count * item.averagePrice * exchangeRate,
        0,
      ),
    };
  },
});

export const savingState = atom({
  key: 'savingState',
  default: [] as SavingProps[],
});

export const checkingState = atom({
  key: 'checkingState',
  default: [] as SavingProps[],
});
export const cmaState = atom({
  key: 'cmaState',
  default: [] as SavingProps[],
});
