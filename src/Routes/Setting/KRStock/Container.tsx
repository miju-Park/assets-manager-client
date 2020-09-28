import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { getPercentage, getStockTicker } from '../../../utils';
import KRStockPresenter, { StockProps } from './Presenter';
import { useMutation, useQuery } from 'react-apollo';

const GET_STOCK_LIST = gql`
  {
    assets(filter: "KRStock") {
      list {
        id
        title
        ticker
        currentPrice
        averagePrice
        count
      }
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
      type: "KRStock"
      title: $title
      ticker: $ticker
      count: $count
      averagePrice: $averagePrice
      currency: 0
    ) {
      id
    }
  }
`;

type GetAssetsQuery = {
  assets: {
    list: StockProps[];
  };
};

const KRStockContainer = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [stockLists, setStockLists] = useState<StockProps[]>([]);
  const { loading, error, data } = useQuery<GetAssetsQuery>(GET_STOCK_LIST);
  const [createAsset, { data: createData }] = useMutation(ADD_ASSETS);
  useEffect(() => {
    if (!data) {
      return;
    }
    console.log('update');
    const {
      assets: { list },
    } = data;
    console.log(list);
    const totalBalance = list.reduce(
      (sum, item) => sum + item.count * item.currentPrice,
      0,
    );

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
          ratio: getPercentage(item.currentPrice * item.count, totalBalance),
          editMode: false,
        };
      }),
    );
    setTotalBalance(totalBalance);
  }, [data]);

  if (loading) return <p>Loading...</p>;

  const onRemove = (id: string) => {
    setStockLists(prev => prev.filter(item => item.id !== id));
  };
  const onAdd = () => {
    setStockLists(prev => [
      ...prev,
      {
        id: 'create',
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
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };
  const onSaveToServer = () => {
    stockLists.map(item => {
      if (item.id === 'create') {
        createAsset({
          variables: {
            title: item.title,
            count: item.count,
            ticker: getStockTicker(item.title),
            averagePrice: item.averagePrice,
          },
        });
      }
    });
  };

  return (
    <KRStockPresenter
      list={stockLists}
      onRemove={onRemove}
      onAdd={onAdd}
      onUpdate={onUpdate}
      onSave={onSaveToServer}
    />
  );
};
export default KRStockContainer;
