export enum CURRENCY {
  KRW = 0,
  USD,
}
export enum ASSETS_TYPE {
  CheckingAccount = 'CheckingAccount',
  SavingAccount = 'SavingAccount',
  USDStock = 'USDStock',
  RealAssets = 'RealAssets',
  CMA = 'CMA',
  KRStock = 'KRStock',
  IRP = 'IRP',
  PersonalPension = 'PersonalPension',
}

export type TableColumnInfo = {
  field: string;
  label: string;
  sortable?: boolean;
  editable: boolean;
};
