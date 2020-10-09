import gql from 'graphql-tag';

export const GET_STOCK_LIST = gql`
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
export const ADD_ASSETS = gql`
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
export const REMOVE_ASSETS = gql`
  mutation deleteAsset($id: Int!) {
    deleteAsset(id: $id)
  }
`;

export const UPDATE_ASSETS = gql`
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
