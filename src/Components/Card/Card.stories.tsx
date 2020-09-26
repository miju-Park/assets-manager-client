import React from 'react';
import Card from '../Card';

export default {
  title: 'Components/Card',
  component: Card,
};

export const simpleCard = () => {
  return <Card>1320만원</Card>;
};

export const exchangesCard = () => {
  return <Card>1670.4원</Card>;
};
