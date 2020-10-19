import React, { useCallback, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { getPercentage, getStockTicker } from '../../../utils';
import { useMutation, useQuery } from 'react-apollo';
import { useRecoilState } from 'recoil';
import { exchangeRateState, usdStockState } from '../../atoms';
import USDStockPresenter from './Presenter';
import { StockProps } from '../../../types';
import {
  ADD_ASSETS,
  GET_STOCK_LIST,
  REMOVE_ASSETS,
  UPDATE_ASSETS,
} from '../USDStock/query';

type GetAssetsQuery = {
  assets: {
    list: StockProps[];
  };
  setting: {
    exchangeRate: number;
  }[];
};
const USDStockContainer = () => {
  const [stockLists, setStockLists] = useRecoilState<StockProps[]>(
    usdStockState,
  );
  const [exchangeRate, setExchangeRate] = useRecoilState<number>(
    exchangeRateState,
  );
  const { loading, error, data, refetch } = useQuery<GetAssetsQuery>(
    GET_STOCK_LIST,
  );
  useEffect(() => {
    if (!data) {
      return;
    }
    const {
      assets: { list },
      setting: [{ exchangeRate }],
    } = data;
    setStockLists(
      list.map(item => {
        const { id, title, ticker, currentPrice, averagePrice, count } = item;
        return {
          id,
          title,
          ticker,
          currentPrice: currentPrice,
          averagePrice: averagePrice,
          count,
          profit: getPercentage(
            item.currentPrice - item.averagePrice,
            item.averagePrice,
          ),
          editMode: false,
        };
      }),
    );
    setExchangeRate(exchangeRate);
  }, [data]);

  const [createAsset, { data: createData }] = useMutation(ADD_ASSETS, {
    onCompleted: () => refetch(),
  });
  const [removeAsset, { data: removeData }] = useMutation(REMOVE_ASSETS, {
    onCompleted: () => refetch(),
  });
  const [updateAsset, { data: updateData }] = useMutation(UPDATE_ASSETS);

  const onRemove = useCallback(
    (id: string) => {
      setStockLists(prev => prev.filter(item => item.id !== id));
      removeAsset({
        variables: {
          id: +id,
        },
      });
    },
    [stockLists],
  );
  const onAdd = useCallback(() => {
    setStockLists(prev => [
      ...prev,
      {
        id: `create-${prev.length}`,
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
  }, [stockLists]);

  const onUpdate = (
    id: string,
    field: string,
    value: string | number | boolean,
  ) => {
    let [targetItem] = stockLists
      .filter(stock => stock.id === id)
      .map(stock => ({ ...stock, [field]: value }));

    setStockLists(prev =>
      prev.map(item => (item.id === id ? targetItem : item)),
    );
    if (field === 'editMode') {
      return;
    }
    if (
      targetItem.id.includes('create') &&
      targetItem.title &&
      targetItem.averagePrice &&
      targetItem.count
    ) {
      createAsset({
        variables: {
          title: targetItem.title,
          count: parseInt(targetItem.count + ''),
          ticker: getStockTicker(targetItem.title),
          averagePrice: parseFloat(targetItem.averagePrice + ''),
        },
      });
    } else if (!targetItem.id.includes('create')) {
      updateAsset({
        variables: {
          id: +targetItem.id,
          title: targetItem.title,
          ticker: targetItem.ticker,
          count: +targetItem.count,
          averagePrice: +targetItem.averagePrice,
        },
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <USDStockPresenter onRemove={onRemove} onAdd={onAdd} onUpdate={onUpdate} />
  );
};
export default USDStockContainer;
