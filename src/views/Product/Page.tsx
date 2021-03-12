import React from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Carousel } from "react-responsive-carousel";

import { RichTextEditorContent } from "@components/atoms";
import * as S from "@components/molecules/ProductDescription/styles";
import AddToCartSection from "@components/organisms/AddToCartSection";
import { ProductMenu } from "@temp/components/MainMenu";

import {
  Breadcrumbs,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import { structuredData } from "../../core/SEO/Product/structuredData";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import OtherProducts from "./Other";
import { IProps } from "./types";

import "./scss/index.scss";

const populateBreadcrumbs = product => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  },
];

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
  }
> = ({ add, product, items, queryAttributes, onAttributeChangeHandler }) => {
  const overlayContext = React.useContext(OverlayContext);

  const [variantId, setVariantId] = React.useState("");

  const getImages = () => {
    if (product.variants && variantId) {
      const variant = product.variants.find(
        variant => variant.id === variantId
      );

      if (variant.images.length > 0) {
        return variant.images;
      }
    }

    return product.images;
  };

  const handleAddToCart = (variantId, quantity) => {
    add(variantId, quantity);
    overlayContext.show(OverlayType.cart, OverlayTheme.right);
  };

  return (
    <>
      <ProductMenu />
      <Container className="mt-3">
        <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
        <Container className="mt-3 product p-5">
          <script className="structured-data-list" type="application/ld+json">
            {structuredData(product)}
          </script>
          <Row className="product-page__product">
            <Col sm={12} md={6}>
              <Carousel>
                {getImages().map((image, i) => {
                  return (
                    <div key={i}>
                      <img src={image.url} alt={image.alt} />
                    </div>
                  );
                })}
              </Carousel>
            </Col>
            <Col sm={12} md={6}>
              <AddToCartSection
                items={items}
                productId={product.id}
                name={product.name}
                productVariants={product.variants}
                productPricing={product.pricing}
                queryAttributes={queryAttributes}
                setVariantId={setVariantId}
                variantId={variantId}
                onAddToCart={handleAddToCart}
                onAttributeChangeHandler={onAttributeChangeHandler}
                isAvailableForPurchase={product.isAvailableForPurchase}
                availableForPurchase={product.availableForPurchase}
              />
            </Col>
          </Row>
          <Tabs
            defaultActiveKey="description"
            transition={false}
            className="mt-5 mb-5"
            id="noanim-tab-example"
          >
            <Tab eventKey="description" title="Description">
              {product.description && (
                <RichTextEditorContent jsonData={product.description} />
              )}
            </Tab>
            <Tab eventKey="attributes" title="Attributes">
              {product.attributes &&
                product.attributes.map((attribute, index) => (
                  <li key={index}>
                    <S.AttributeName>
                      {attribute.attribute.name}:{" "}
                    </S.AttributeName>{" "}
                    {attribute.values.map(value => value.name).join(", ")}
                  </li>
                ))}
            </Tab>
          </Tabs>
        </Container>
        <OtherProducts products={product.category.products.edges} />
      </Container>
    </>
  );
};

export default Page;
