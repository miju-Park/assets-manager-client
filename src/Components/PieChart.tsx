import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { getAbstractNumber, getPercentage } from '../utils';
import { CURRENCY } from '../types';

type PieItemType = {
  id: string;
  label: string;
  value: number;
};

type PieChartInterface = {
  data: PieItemType[];
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};
const PieChart = ({ data, margin }: PieChartInterface) => {
  const total = data.reduce((sum, item) => item.value + sum, 0);
  return (
    <ResponsivePie
      data={data}
      margin={margin}
      sortByValue={true}
      innerRadius={0.6}
      cornerRadius={3}
      colors={['#ba54f5', '#3a86ff', '#fb5607', '#ff006e', '#ffbe0b']}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
      enableRadialLabels={false}
      tooltipFormat={d =>
        `${getAbstractNumber(d, CURRENCY.KRW)} (${getPercentage(d, total)})`
      }
      radialLabelsLinkColor="inherit"
      radialLabelsTextColor="inherit:darker(1.2)"
      enableSlicesLabels={true}
      sliceLabel="label"
      slicesLabelsTextColor="#343a40" //"#ced4da"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};
export default PieChart;
