import Link from "next/link";
import * as React from "react";
import { ReactMegaMenu } from "react-mega-menu/lib";

import { ProductsList_categories } from "@temp/views/Home/gqlTypes/ProductsList";
import { generateCategoryUrl } from "@utils/core";

import "./scss/index.scss";

export interface MegamenuProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  categories: ProductsList_categories;
}

const CategorylistToMegamenu = (categories: ProductsList_categories) => {
  const val: any[] = [];
  if (!categories || !categories.edges || categories.edges.length === 0)
    return val;
  categories.edges.forEach(item => {
    val.push({
      label: (
        <Link href={generateCategoryUrl(item.node.id, item.node.name)}>
          {item.node.name}
        </Link>
      ),
      key: item.node.id,
      items: Megamenu({ categories: (item.node as any).children }),
    });
  });
  return val;
};

const Megamenu: React.FC<MegamenuProps> = ({ categories, ...rest }) => (
  <div className="megamenu-list">
    <ReactMegaMenu
      tolerance={100}
      direction="RIGHT"
      styleConfig={{
        menuProps: {
          style: {
            height: "auto",
            margin: "0",
            background: "white",
          },
        },
        contentProps: {
          style: {
            width: "auto",
          },
        },
        menuItemProps: {
          style: {
            width: "300px",
            display: "block",
            padding: "0.6rem 1.2rem",
          },
        },
        menuItemSelectedProps: {
          style: {
            padding: "0.6rem 1.2rem",
            backgroundColor: "lightgray",
          },
        },
        containerProps: {
          style: {
            background: "white",
            border: "1px solid lightgray",
          },
        },
      }}
      data={CategorylistToMegamenu(categories)}
    />
  </div>
);

export default Megamenu;
