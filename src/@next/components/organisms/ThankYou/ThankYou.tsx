import { OrderStatus } from "@saleor/sdk";
import Link from "next/link";
import React from "react";
import { Button } from "react-bootstrap";
import { defineMessages, FormattedMessage } from "react-intl";

import { Container } from "@components/templates";
import { checkoutMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const messages = defineMessages({
  unfulfilled: {
    defaultMessage:
      "We’ve emailed you an order confirmation, and we’ll notify you when the order has been shipped.",
    description: "thank you subtitle",
  },
  unconfirmed: {
    defaultMessage:
      "Your order has been placed, it needs to be confirmed by the staff, we'll send you an email when it's done.",
    description: "thank you subtitle",
  },
});

/**
 * Thank you page after completing the checkout.
 */
const ThankYou: React.FC<IProps> = ({
  orderStatus,
  orderNumber,
  continueShoppingUrl,
  orderDetailsUrl,
}: IProps) => {
  return (
    <Container data-test="thankYouView">
      <S.Wrapper>
        <S.ThankYouHeader>
          <FormattedMessage defaultMessage="Thank you" />
          <br />
          <span>
            <FormattedMessage defaultMessage="for your order!" />
          </span>
        </S.ThankYouHeader>
        <S.Paragraph>
          <FormattedMessage defaultMessage="Your order number is" />{" "}
          <span>{orderNumber}</span>
        </S.Paragraph>
        <S.Paragraph>
          <FormattedMessage
            {...(orderStatus === OrderStatus.UNCONFIRMED
              ? messages.unconfirmed
              : messages.unfulfilled)}
          />
        </S.Paragraph>
        <S.Buttons>
          <Link href={continueShoppingUrl}>
            <Button data-test="continueShoppingButton" variant="secondary">
              <FormattedMessage {...checkoutMessages.continueShopping} />
            </Button>
          </Link>
          <Link href={orderDetailsUrl}>
            <Button>
              <FormattedMessage defaultMessage="ORDER DETAILS" />
            </Button>
          </Link>
        </S.Buttons>
      </S.Wrapper>
    </Container>
  );
};

export { ThankYou };
