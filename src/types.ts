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

export type StockTableProps = {
  onRemove: (id: string) => void;
  onAdd: () => void;
  onUpdate: (
    id: string,
    field: string,
    value: string | number | boolean,
  ) => void;
  onSave?: () => void;
};

export type StockProps = {
  id: string;
  title: string;
  ticker: string;
  currentPrice: number;
  averagePrice: number;
  count: number;
  profit: string;
  ratio?: string;
  editMode: boolean;
  balance?: number;
};

export type SavingProps = {
  id: string;
  bank: string;
  title: string;
  payment: number;
  startdate: Date;
  duedate: Date;
  balance: number;
};
