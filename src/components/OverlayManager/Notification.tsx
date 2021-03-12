import * as React from "react";
import { Alert } from "react-bootstrap";

import { OverlayContextInterface } from "..";

export const NotificationOverlay: React.FC<{
  overlay: OverlayContextInterface;
}> = ({ overlay: { hide, context } }) => {
  return (
    <Alert title={context.title} variant={context.status} onClose={hide}>
      {context.content}
    </Alert>
  );
};

export default NotificationOverlay;
