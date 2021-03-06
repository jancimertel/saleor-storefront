import * as React from "react";

import { Overlay, OverlayContext, OverlayType } from "..";
import Cart from "./Cart";
import Login from "./Login";
import MobileNav from "./MobileNav";
import Modal from "./Modal";
import Notification from "./Notification";
import Password from "./Password";

const OverlayManager: React.FC = () => (
  <OverlayContext.Consumer>
    {overlay => {
      switch (overlay.type) {
        case OverlayType.modal:
          return <Modal data-test="modal" overlay={overlay} />;

        case OverlayType.message:
          return <Notification overlay={overlay} />;

        case OverlayType.cart:
          return <Cart overlay={overlay} />;

        case OverlayType.login:
          return <Login overlay={overlay} />;

        case OverlayType.register:
          return <Login overlay={overlay} active="register" />;

        case OverlayType.password:
          return <Password overlay={overlay} />;

        case OverlayType.sideNav:
          return <MobileNav overlay={overlay} />;

        case OverlayType.mainMenuNav:
          return <Overlay data-test="mainMenuOverlay" context={overlay} />;

        default:
          return null;
      }
    }}
  </OverlayContext.Consumer>
);

export default OverlayManager;
