import gql from "graphql-tag";

import { TypedQuery } from "@temp/core/queries";
import { ProductsList_categories } from "@temp/views/Home/gqlTypes/ProductsList";

export interface MetadataItem {
  key: string;
  value: string;
}

export interface ObjectWithMetadata {
  privateMetadata: MetadataItem[];
  metadata: MetadataItem[];
}

export const CategoriesQuery = gql`
  query CategoriesList($channel: String) {
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

export const TypedCategoriesQuery = TypedQuery<ProductsList_categories, {}>(
  CategoriesQuery
);
