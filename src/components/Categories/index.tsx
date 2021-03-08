import Link from "next/link";
import * as React from "react";

import { generateCategoryUrl } from "@utils/core";

import { TypedCategoryListQuery } from "./queries";

import "./scss/index.scss";

interface CategoryListProps {
  level?: number;
}

const Categories: React.FC<CategoryListProps> = ({ level: number }) => {
  return (
    <TypedCategoryListQuery displayError>
      {({ data }) => {
        if (data.categories.edges.length) {
          return (
            <ul className="home-page__categories__list">
              {data.categories.edges.map(({ node: category }) => {
                return (
                  <li key={category.id}>
                    <Link
                      key={category.id}
                      href={generateCategoryUrl(category.id, category.name)}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        }
      }}
    </TypedCategoryListQuery>
  );
};

Categories.defaultProps = {
  level: 0,
};

export default Categories;
