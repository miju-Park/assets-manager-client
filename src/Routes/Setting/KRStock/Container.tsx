import React, { useEffect, useState } from 'react';
import { getPercentage } from '../../../utils';
import KRStockPresenter from './Presenter';

const data = [
  {
    id: 1,
    title: '삼성전자',
    ticker: '452',
    currentPrice: 20000,
    averagePrice: 20000,
    count: 20,
  },
  {
    id: 2,
    title: '삼성전자',
    ticker: '452',
    currentPrice: 20000,
    averagePrice: 20000,
    count: 20,
  },
];

const KRStockContainer = () => {
  const [totalBalance, setTotalBalance] = useState(
    data.reduce((sum, item) => sum + item.currentPrice * item.count, 0),
  );
  const [stockLists, setStockLists] = useState(
    data.map(item => ({
      ...item,
      profit: getPercentage(
        item.currentPrice - item.averagePrice,
        item.averagePrice,
      ),
      ratio: getPercentage(item.currentPrice * item.count, totalBalance),
      editMode: false,
    })),
  );
  const onToggleEditMode = (index: number) => {
    setStockLists(prev =>
      prev.map(item =>
        item.id === index ? { ...item, editMode: !item.editMode } : item,
      ),
    );
  };
  const onRemove = (id: number) => {
    setStockLists(prev => prev.filter(item => item.id !== id));
  };
  const onAdd = () => {
    setStockLists(prev => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        title: '',
        ticker: '',
        currentPrice: 0,
        averagePrice: 0,
        count: 0,
        profit: '',
        ratio: '',
        editMode: true,
      },
    ]);
  };
  const onUpdate = (
    id: number,
    field: string,
    value: string | number | boolean,
  ) => {
    setStockLists(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  return (
    <KRStockPresenter
      list={stockLists}
      onRemove={onRemove}
      onAdd={onAdd}
      onUpdate={onUpdate}
    />
  );
};
export default KRStockContainer;
