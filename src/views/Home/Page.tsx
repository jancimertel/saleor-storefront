import * as React from "react";

import Megamenu from "@temp/components/Megamenu";

import { ProductsFeatured } from "../../components";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
import {
  ProductsList_categories,
  ProductsList_collection_backgroundImage,
  ProductsList_shop,
} from "./gqlTypes/ProductsList";

import "./scss/index.scss";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_collection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="container">
        <div className="title-offer">
          <Megamenu categories={categories} />
          <div style={{ marginLeft: 300 }}>
            <ProductsFeatured />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
