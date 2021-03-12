import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { MainMenu } from "../Search/gqlTypes/MainMenu";
import {
  SearchResults,
  SearchResultsVariables,
} from "../Search/gqlTypes/SearchResults";

export const mainMenu = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
    category {
      id
      name
    }
    url
    collection {
      id
      name
    }
    page {
      slug
    }
    parent {
      id
    }
  }

  query MainMenu($channel: String!, $slug: String!) {
    menu(channel: $channel, slug: $slug) {
      id
      items {
        ...MainMenuSubItem
        children {
          ...MainMenuSubItem
          children {
            ...MainMenuSubItem
          }
        }
      }
    }
  }
`;

const searchResultsQuery = gql`
  query SearchResults($query: String!, $channel: String) {
    products(filter: { search: $query }, channel: $channel, first: 20) {
      edges {
        node {
          id
          name
          thumbnail {
            url
            alt
          }
          thumbnail2x: thumbnail(size: 510) {
            url
          }
          category {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);

export const TypedSearchResults = TypedQuery<
  SearchResults,
  SearchResultsVariables
>(searchResultsQuery);
