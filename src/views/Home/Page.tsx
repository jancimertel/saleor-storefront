import * as React from "react";
import { Col, Container, Row } from "react-bootstrap";

import { ProductMenu } from "@temp/components/MainMenu";
import Megamenu from "@temp/components/Megamenu";

import { ProductsFeatured } from "../../components";
import { structuredData } from "../../core/SEO/Homepage/structuredData";
import {
  ProductsList_collection_backgroundImage,
  ProductsList_shop,
} from "./gqlTypes/ProductsList";

const Page: React.FC<{
  loading: boolean;
  backgroundImage: ProductsList_collection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, backgroundImage, shop }) => {
  return (
    <>
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <ProductMenu className="mb-3" sticky />
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={12} lg={3}>
            <Megamenu />
          </Col>
          <Col xs={12} md={12} lg={9}>
            <ProductsFeatured />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
