import React from "react";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

export interface IAddToCartButton {
  disabled: boolean;
  onSubmit: () => void;
}

export const AddToCartButton: React.FC<IAddToCartButton> = ({
  onSubmit,
  disabled,
}) => {
  return (
    <Button onClick={onSubmit} color="primary" size="lg" disabled={disabled}>
      <FormattedMessage defaultMessage="Add to basket" />
    </Button>
  );
};
AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
