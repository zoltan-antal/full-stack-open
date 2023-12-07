import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepositoryFields
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_REPOSITORY = gql`
  query getRepositoryById($id: ID!) {
    repository(id: $id) {
      ...RepositoryFields
    }
  }
  ${REPOSITORY_FIELDS}
`;

export const GET_REVIEWS = gql`
  query getQueriesByRepositoryId($id: ID!) {
    repository(id: $id) {
      reviews {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`;

export const ME = gql`
  query me($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewFields
          }
        }
      }
    }
  }
  ${REVIEW_FIELDS}
`;
