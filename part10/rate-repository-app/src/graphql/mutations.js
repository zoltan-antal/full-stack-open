import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation signUp($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`;
