import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";

import { TaxedMoney } from "@components/containers";
import { generateProductUrl } from "@temp/core/utils";

import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <Card style={{ width: "100%" }}>
      <Card.Img
        src={product.thumbnail ? product.thumbnail.url : ""}
        variant="top"
      />
      <Card.Body>
        <Card.Title>
          <Link href={generateProductUrl(product.id, product.name)}>
            {product.name}
          </Link>
        </Card.Title>
        <Card.Text>{product.seoDescription}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        <TaxedMoney taxedMoney={price} />
      </Card.Footer>
    </Card>
  );
};
