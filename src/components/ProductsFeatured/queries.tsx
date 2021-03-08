import gql from "graphql-tag";

import { Collection_attributes_edges } from "@temp/views/Collection/gqlTypes/Collection";

import { TypedQuery } from "../../core/queries";

export const getCollections = gql`
  query FeaturedProducts($channel: String) {
    collections(first: 0, last: 100, channel: $channel) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
            alt
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

export const TypedFeaturedProductsQuery = TypedQuery<
  {
    collections: {
      edges: Collection_attributes_edges[];
    };
  },
  null
>(getCollections);
