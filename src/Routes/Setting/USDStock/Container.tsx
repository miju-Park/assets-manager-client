import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { getPercentage, getStockTicker } from '../../../utils';
import { useMutation, useQuery } from 'react-apollo';
import { useRecoilState } from 'recoil';
import { usdStockState } from '../../atoms';
import USDStockPresenter from './Presenter';
import { StockProps } from '../../../types';

const GET_STOCK_LIST = gql`
  {
    assets(filter: "USDStock") {
      list {
        id
        title
        ticker
        currentPrice
        averagePrice
        count
        balance
      }
    }
    setting {
      exchangeRate
    }
  }
`;
const ADD_ASSETS = gql`
  mutation createAsset(
    $title: String!
    $count: Int!
    $ticker: String!
    $averagePrice: Float!
  ) {
    createAsset(
      type: "USDStock"
      title: $title
      ticker: $ticker
      count: $count
      averagePrice: $averagePrice
      currency: 1
    ) {
      id
    }
  }
`;
const REMOVE_ASSETS = gql`
  mutation deleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`;
const UPDATE_ASSETS = gql`
  mutation updateAsset(
    $id: Int!
    $title: String!
    $count: Int!
    $ticker: String!
    $averagePrice: Float!
  ) {
    updateAsset(
      id: $id
      title: $title
      ticker: $ticker
      count: $count
      averagePrice: $averagePrice
    ) {
      id
    }
  }
`;

type GetAssetsQuery = {
  assets: {
    list: StockProps[];
  };
  setting: {
    exchangeRate: number;
  }[];
};
const USDStockContainer = () => {
  const [removedId, setRemovedId] = useState<string[]>([]);
  const [stockLists, setStockLists] = useRecoilState<StockProps[]>(
    usdStockState,
  );
  const { loading, error, data } = useQuery<GetAssetsQuery>(GET_STOCK_LIST);
  const [createAsset, { data: createData }] = useMutation(ADD_ASSETS);
  const [removeAsset, { data: removeData }] = useMutation(REMOVE_ASSETS);
  const [updateAsset, { data: updateData }] = useMutation(UPDATE_ASSETS);
  useEffect(() => {
    if (!data) {
      return;
    }
    const {
      assets: { list },
      setting: [{ exchangeRate }],
    } = data;
    const totalBalance = list.reduce(
      (sum, item) => sum + item?.count * item.currentPrice * exchangeRate,
      0,
    );

    setStockLists(prev => [
      ...list.map(item => {
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
          ratio: getPercentage(
            item.currentPrice * item.count * exchangeRate,
            totalBalance,
          ),
          editMode: false,
        };
      }),
    ]);
  }, [data]);

  if (loading) return <p>Loading...</p>;

  const onRemove = (id: string) => {
    setStockLists(prev => prev.filter(item => item.id !== id));
    setRemovedId(prev => [...prev, id]);
  };
  const onAdd = () => {
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
  };
  const onUpdate = (
    id: string,
    field: string,
    value: string | number | boolean,
  ) => {
    setStockLists(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              [field]: field.includes('Price') ? +value : value,
            }
          : item,
      ),
    );
  };
  const onSaveToServer = () => {
    stockLists.map(async item => {
      if (item.id.includes('create') && item.title !== '') {
        await createAsset({
          variables: {
            title: item.title,
            count: parseInt(item.count + ''),
            ticker: getStockTicker(item.title),
            averagePrice: parseFloat(item.averagePrice + ''),
          },
        });
      } else {
        const target = data?.assets.list.find(list => list.id === item.id);
        if (target) {
          if (
            target.count !== item.count ||
            target.ticker !== item.ticker ||
            +target.averagePrice !== +item.averagePrice
          ) {
            await updateAsset({
              variables: {
                id: +target.id,
                title: item.title,
                ticker: item.ticker,
                count: +item.count,
                averagePrice: +item.averagePrice,
              },
            });
          }
        }
      }
    });
    removedId.map(async item => {
      await removeAsset({
        variables: {
          id: +item,
        },
      });
    });
  };

  return (
    <USDStockPresenter
      exchangeRate={data?.setting[0]?.exchangeRate || 1}
      onRemove={onRemove}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onSave={onSaveToServer}
    />
  );
};
export default USDStockContainer;
