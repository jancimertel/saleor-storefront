import gql from "graphql-tag";

import { TypedQuery } from "../../core/queries";
import { ProductsList } from "./gqlTypes/ProductsList";

export const homePageQuery = gql`
  query ProductsList($channel: String) {
    shop {
      description
      name
    }
    collection(channel: $channel) {
      backgroundImage {
        url
        alt
      }
    }
    categories(level: 0, first: 0, last: 100) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
            alt
          }
          children(first: 0, last: 100) {
            edges {
              node {
                name
                id
                backgroundImage {
                  url
                  alt
                }
              }
            }
          }
          metadata {
            key
            value
          }
        }
      }
    }
  }
`;

export const TypedHomePageQuery = TypedQuery<ProductsList, {}>(homePageQuery);
