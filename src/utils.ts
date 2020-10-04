import { ASSETS_TYPE, CURRENCY } from './types';

export const getPercentage = (target: number, total: number): string => {
  const data = (target / total) * 100;
  if (isNaN(data)) {
    return '-%';
  }
  return `${data.toFixed(1)}%`;
};

export const markingComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getAbstractNumber = (num: number, currency: CURRENCY): string => {
  if (currency === CURRENCY.KRW) {
    const targetNumber = parseInt(num + '');
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

export const getStockTicker = (title: string): string => {
  switch (title) {
    case '넷마블':
      return '251270';
    case '삼성전자':
      return '005930';
    case '현대건설':
      return '000720';
    case 'NAVER':
      return '035420';
    case 'KODEX 한국대만IT프리미어':
      return '298770';
    case 'KODEX 2차전지산업':
      return '305720';
    case '현금':
      return '';
    case '애플':
      return 'AAPL';
    case 'SPDR':
      return 'DIA';
    case 'ISHARES GOLD':
      return 'IAU';
    case '마이크로소프트':
      return 'MSFT';
    case '엔비디아':
      return 'NVDA';
    case '테슬라':
      return 'TSLA';
    case 'USD':
      return '';
    default:
      return '';
  }
};
