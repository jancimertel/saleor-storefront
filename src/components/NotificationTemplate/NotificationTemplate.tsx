import * as React from "react";
import { Alert } from "react-bootstrap";

import { INotificationTemplate } from "./customTypes";

export const NotificationTemplate: React.FC<INotificationTemplate> = ({
  message,
  options,
  close,
}) => {
  return (
    <Alert title={message.title} variant={options.type} onClose={close}>
      {message.content}
    </Alert>
  );
};

export default NotificationTemplate;
