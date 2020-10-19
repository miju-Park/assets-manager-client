import gql from 'graphql-tag';

export const GET_SAVING_LIST = gql`
  {
    assets(filter: "SavingAccount") {
      list {
        id
        title
        bank
        payment
        balance
        startdate
        duedate
      }
    }
  }
`;
