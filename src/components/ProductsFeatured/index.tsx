import Link from "next/link";
import * as React from "react";
import { Carousel } from "react-bootstrap";

import { generateCollectionUrl } from "@utils/core";

import { TypedFeaturedProductsQuery } from "./queries";

import "./scss/index.scss";

const ProductsFeatured: React.FC<{ title?: any }> = () => {
  return (
    <TypedFeaturedProductsQuery displayError>
      {({ data }) => {
        if (data.collections.edges.length) {
          return (
            <Carousel className="featured-carousel">
              {data.collections.edges.map(({ node: collection }) => {
                return (
                  <Carousel.Item key={collection.id}>
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
                  </Carousel.Item>
                );
              })}
            </Carousel>
          );
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};

export default ProductsFeatured;
