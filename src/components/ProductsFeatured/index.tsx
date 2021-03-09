import Link from "next/link";
import * as React from "react";

import { getMetadataValue } from "@temp/core/utils";
import { generateCollectionUrl } from "@utils/core";

import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";

const ProductsFeatured: React.FC<{ title?: any }> = () => {
  return (
    <TypedFeaturedProductsQuery displayError>
      {({ data }) => {
        if (data.collections.edges.length) {
          return (
            <div className="products-featured">
              {data.collections.edges.map(({ node: collection }) => {
                const isImportant = getMetadataValue(
                  "important",
                  collection.metadata
                );

                if (isImportant) {
                  return (
                    <Link
                      key={collection.id}
                      href={generateCollectionUrl(
                        collection.id,
                        collection.name
                      )}
                    >
                      <a>
                        <img
                          alt={collection.name}
                          src={collection.backgroundImage.url}
                        />
                      </a>
                    </Link>
                  );
                }
              })}
            </div>
          );
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};

export default ProductsFeatured;
