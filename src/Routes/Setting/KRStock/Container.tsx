import React, { memo, useCallback, useEffect, useState } from 'react';

import { getPercentage, getStockTicker } from '../../../utils';
import KRStockPresenter from './Presenter';
import { useMutation, useQuery } from 'react-apollo';
import { useRecoilState } from 'recoil';
import { krStockState } from '../../atoms';
import { StockProps } from '../../../types';
import {
  GET_STOCK_LIST,
  ADD_ASSETS,
  REMOVE_ASSETS,
  UPDATE_ASSETS,
} from './query';

type GetAssetsQuery = {
  assets: {
    list: StockProps[];
  };
};

const KRStockContainer = () => {
  const [stockLists, setStockLists] = useRecoilState<StockProps[]>(
    krStockState,
  );
  const { loading, error, data, refetch } = useQuery<GetAssetsQuery>(
    GET_STOCK_LIST,
  );
  useEffect(() => {
    if (data) {
      const {
        assets: { list },
      } = data;
      setStockLists(
        list.map(item => {
          const { id, title, ticker, currentPrice, averagePrice, count } = item;
          return {
            id,
            title,
            ticker,
            currentPrice,
            averagePrice,
            count,
            profit: getPercentage(
              item.currentPrice - item.averagePrice,
              item.averagePrice,
            ),
            editMode: false,
          };
        }),
      );
    }
  }, [data]);
  const [createAsset, { data: createData }] = useMutation(ADD_ASSETS, {
    onCompleted: () => refetch(),
  });
  const [removeAsset, { data: removeData }] = useMutation(REMOVE_ASSETS, {
    onCompleted: () => refetch(),
  });
  const [updateAsset, { data: updateData }] = useMutation(UPDATE_ASSETS);

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
        editMode: true,
      },
    ]);
  }, [stockLists]);

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
    <KRStockPresenter onRemove={onRemove} onAdd={onAdd} onUpdate={onUpdate} />
  );
};
export default memo(KRStockContainer);
