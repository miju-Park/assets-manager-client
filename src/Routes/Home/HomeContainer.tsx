import React from 'react';
import HomePresenter from './HomePresenter';
import { Query } from 'react-apollo';
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

const TOTAL_ASSETS = gql`
  {
    assets {
      total
      currency
    }
  }
`;

const HomeContainer = () => {
  return (
    <Query query={TOTAL_ASSETS}>
      {({ loading, error, data }: any) => {
        if (loading) return <div>Fetching</div>;
        if (error) return <div>Error</div>;

        const {
          assets: { total: amount, currency },
        } = data;

        const total = getAbstractNumber(amount, currency);

        return <HomePresenter total={total} />;
      }}
    </Query>
  );
};
export default HomeContainer;
