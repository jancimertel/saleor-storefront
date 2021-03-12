import * as React from "react";
import { ListGroup } from "react-bootstrap";

import { CategorylistToMegamenu } from "@temp/components/MainMenu/ProductMenu";
import { TypedCategoriesQuery } from "@temp/gql/categories";

export interface MegamenuProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Megamenu: React.FC<MegamenuProps> = ({ ...rest }) => (
  <TypedCategoriesQuery displayError>
    {({ data }) => {
      return (
        <ListGroup className="megamenu-list">
          {CategorylistToMegamenu(data, ListGroup.Item, {
            action: true,
          })}
        </ListGroup>
      );
    }}
  </TypedCategoriesQuery>
);

export default Megamenu;
