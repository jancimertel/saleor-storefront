import classNames from "classnames";
import React from "react";
import {
  Col,
  Container,
  DropdownButton,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Basket as BacketIcon } from "react-bootstrap-icons";

import { Search } from "@temp/components/Search";
import { generateCategoryUrl } from "@temp/core/utils";
import { TypedCategoriesQuery } from "@temp/gql/categories";
import { ProductsList_categories } from "@temp/views/Home/gqlTypes/ProductsList";

import "./scss/index.scss";

interface ProductMenuProps {
  className?: string;
  show?: boolean;
  sticky?: boolean;
}

export const CategorylistToMegamenu = (
  categories: ProductsList_categories,
  component: React.ElementType,
  childProps?: any,
  ignoreChild?: boolean
) => {
  const val: any[] = [];
  if (
    !categories ||
    !categories.categories ||
    !categories.categories.edges ||
    categories.categories.edges.length === 0
  )
    return val;

  categories.categories.edges.forEach(item => {
    val.push(
      React.createElement(
        component,
        {
          key: item.node.id,
          href: generateCategoryUrl(item.node.id, item.node.name),
          ...childProps,
        },
        <>
          <BacketIcon /> {item.node.name}
          {!ignoreChild
            ? CategorylistToMegamenu(
                item.node.children,
                component,
                childProps,
                ignoreChild
              )
            : null}
        </>
      )
    );
  });
  return val;
};

const ProductMenu: React.FC<ProductMenuProps> = ({
  className,
  show,
  sticky,
}) => {
  return (
    <TypedCategoriesQuery displayError>
      {({ data }) => {
        return (
          <Navbar
            sticky={sticky ? "top" : null}
            bg="primary"
            variant="dark"
            className={classNames(className, {})}
          >
            <Container className="product-menu">
              <Col xs={12} md={4} lg={3}>
                <Nav>
                  <DropdownButton
                    size="lg"
                    title="Choose a category"
                    className="btn-block w-100"
                    variant="dark"
                    show={show}
                    style={{ width: "100%" }}
                  >
                    {CategorylistToMegamenu(data, NavDropdown.Item, {}, true)}
                  </DropdownButton>
                </Nav>
              </Col>

              <Col xs={12} md={8} lg={9}>
                <Form inline className="mr-auto">
                  <Search className="mr-sm-2" placeholder="Search" />
                </Form>
              </Col>
            </Container>
          </Navbar>
        );
      }}
    </TypedCategoriesQuery>
  );
};

export default ProductMenu;
