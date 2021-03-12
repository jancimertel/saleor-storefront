import { storiesOf } from "@storybook/react";
import React from "react";

import { ButtonLink } from ".";

const TEXT = "Text";
storiesOf("@components/atoms/ButtonLink", module)
  .addParameters({ component: ButtonLink })
  .add("Base", () => <ButtonLink data-test="test">{TEXT}</ButtonLink>)
  .add("Secondary", () => (
    <ButtonLink color="secondary" data-test="test">
      {TEXT}
    </ButtonLink>
  ))
  .add("Size sm", () => (
    <ButtonLink size="sm" data-test="test">
      {TEXT}
    </ButtonLink>
  ));
