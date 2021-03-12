import React from "react";
import { Button, CardDeck } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import { Loader } from "@components/atoms";
import { ProductTile } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading = false,
  testingContextId,
  onLoadMore = () => null,
}: IProps) => {
  return (
    <>
      <CardDeck style={{ columnCount: 5 }}>
        {products.map(product => (
          <ProductTile key={product.id} product={product} />
        ))}
      </CardDeck>
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button color="secondary" onClick={onLoadMore}>
              <FormattedMessage defaultMessage="More +" />
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
