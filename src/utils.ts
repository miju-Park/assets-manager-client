import { ASSETS_TYPE, CURRENCY } from './types';

export const getPercentage = (target: number, total: number): string => {
  return `${((target / total) * 100).toFixed(1)}%`;
};

const markingComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getAbstractNumber = (num: number, currency: CURRENCY): string => {
  if (currency === CURRENCY.KRW) {
    const targetNumber = parseInt(num + '');
    console.log(targetNumber.toString().length);
    if (targetNumber.toString().length > 8) {
      const hundredMillion = parseInt(targetNumber / 100000000 + '');
      const remain = targetNumber % 100000000;
      return `${hundredMillion}억${
        remain !== 0
          ? ` ${markingComma(parseInt(remain / 10000 + ''))} 만원`
          : '원'
      }`;
    } else {
      return `${markingComma(parseInt(targetNumber / 10000 + ''))}만원`;
    }
  }
  return `$ ${markingComma(num)}`;
};

export const getAssetsLabel = (type: ASSETS_TYPE): string => {
  switch (type) {
    case ASSETS_TYPE.CheckingAccount:
      return '예금';
    case ASSETS_TYPE.SavingAccount:
      return '적금';
    case ASSETS_TYPE.RealAssets:
      return '부동산';
    case ASSETS_TYPE.USDStock:
      return '해외주식';
    case ASSETS_TYPE.KRStock:
      return '국내주식';
    case ASSETS_TYPE.IRP:
      return 'IRP';
    case ASSETS_TYPE.PersonalPension:
      return '개인연금';
    case ASSETS_TYPE.CMA:
      return 'CMA';
    default:
      return '';
  }
};
