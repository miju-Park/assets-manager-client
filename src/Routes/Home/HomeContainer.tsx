import React, { useEffect } from 'react';
import moment from 'moment';
import HomePresenter from './HomePresenter';
import { useQuery, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { getAbstractNumber, getAssetsLabel } from '../../utils';
import { ASSETS_TYPE } from '../../types';

const GET_ASSETS = gql`
  {
    assetsSummary(filter: "Cash") {
      total
      currency
      list {
        type
        total
      }
    }
    setting {
      exchangeRate
      updatedAt
    }
  }
`;

const UPDATE_ASSETS = gql`
  mutation {
    renewAssetInfo
  }
`;

const HomeContainer = () => {
  const { loading, error, data } = useQuery(GET_ASSETS);
  const [updateAssets] = useMutation(UPDATE_ASSETS);
  useEffect(() => {
    const updatedAt = localStorage.getItem('update') || '';
    const today = moment().format('YYYY-MM-DD');
    if (updatedAt !== today) {
      localStorage.setItem('update', today);
      updateAssets();
    }
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    assetsSummary: { total: amount, currency, list },
    setting,
  } = data;

  const summaryList: { type: string; total: number }[] = list;

  const stocks = summaryList.filter(
    item =>
      item.type === ASSETS_TYPE.USDStock || item.type === ASSETS_TYPE.KRStock,
  );

  const summary = summaryList
    .filter(
      item =>
        item.type !== ASSETS_TYPE.USDStock && item.type !== ASSETS_TYPE.KRStock,
    )
    .map(item => {
      return {
        id: item.type,
        value: item.total,
        label: getAssetsLabel(item.type as ASSETS_TYPE),
      };
    });
  const total = getAbstractNumber(amount, currency);

  return (
    <HomePresenter
      total={total}
      exchangeRate={setting[0]}
      summaryItem={[
        ...summary,
        {
          id: 'Stock',
          value: stocks.reduce((sum, stock) => sum + stock.total, 0),
          label: '주식',
        },
      ]}
    />
  );
};
export default HomeContainer;
