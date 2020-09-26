import React, { useEffect } from 'react';
import HomePresenter from './HomePresenter';
import { Query, Mutation, useQuery, useMutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENCY } from '../../types';

const markingComma = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const getAbstractNumber = (num: number, currency: CURRENCY): string => {
  if (currency === CURRENCY.KRW) {
    const targetNumber = parseInt(num + '');
    if (targetNumber.toString().length > 7) {
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

const GET_ASSETS = gql`
  {
    assets {
      total
      currency
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
    updateAssets();
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    assets: { total: amount, currency },
    setting,
  } = data;

  const total = getAbstractNumber(amount, currency);

  return <HomePresenter total={total} exchangeRate={setting[0]} />;
};
export default HomeContainer;
