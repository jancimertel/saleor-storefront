import gql from "graphql-tag";

import { ProductsList_categories } from "@temp/views/Home/gqlTypes/ProductsList";

import { TypedQuery } from "../../core/queries";

export interface CategoryList {
  categories: ProductsList_categories | null;
}
export const getCategories = gql`
  query CategoryList($channel: String) {
    categories(level: 0, first: 100) {
      edges {
        node {
          id
          name
          backgroundImage {
            url
          }
        }
      }
    }
  }
`;

export const TypedCategoryListQuery = TypedQuery<CategoryList, {}>(
  getCategories
);
