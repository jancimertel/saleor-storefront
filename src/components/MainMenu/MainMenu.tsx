import { useAuth, useCart } from "@saleor/sdk";
import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import ReactSVG from "react-svg";

import { paths } from "@paths";
import { Search } from "@temp/components/Search";
import { commonMessages } from "@temp/intl";

import logoImg from "../../images/logo.svg";
import userImg from "../../images/user.svg";
import { Offline, Online, OverlayContext, OverlayTheme, OverlayType } from "..";

import "./scss/index.scss";

interface MainMenuProps {
  demoMode: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ demoMode }) => {
  const overlayContext = useContext(OverlayContext);

  const { user, signOut } = useAuth();
  const { items } = useCart();

  const handleSignOut = () => {
    signOut();
  };

  const cartItemsQuantity =
    (items &&
      items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) ||
    0;

  const [activeDropdown] = useState<string>(undefined);

  useEffect(() => {
    if (activeDropdown) {
      overlayContext.show(OverlayType.mainMenuNav, OverlayTheme.modal);
    } else {
      overlayContext.hide();
    }
  }, [activeDropdown]);

  return (
    <Navbar bg="light" expand="lg">
      <Container className="justify-content-between">
        <Navbar.Brand href={paths.home}>
          <ReactSVG path={logoImg} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Search className="mr-sm-2" placeholder="Search" />
        </Navbar.Collapse>
        <Navbar id="basic-navbar-nav">
          <Nav>
            <Online>
              {user ? (
                <NavDropdown
                  title={<FormattedMessage {...commonMessages.myAccount} />}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={paths.account}>
                    <FormattedMessage {...commonMessages.myAccount} />
                  </NavDropdown.Item>
                  <NavDropdown.Item href={paths.accountOrderHistory}>
                    <FormattedMessage {...commonMessages.orderHistory} />
                  </NavDropdown.Item>
                  <NavDropdown.Item href={paths.accountAddressBook}>
                    <FormattedMessage {...commonMessages.addressBook} />
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={handleSignOut}
                    data-test="desktopMenuLogoutLink"
                  >
                    <FormattedMessage {...commonMessages.logOut} />
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link
                  data-test="desktopMenuLoginOverlayLink"
                  className="main-menu__icon"
                  onClick={() =>
                    overlayContext.show(OverlayType.login, OverlayTheme.right)
                  }
                >
                  <ReactSVG path={userImg} />
                </Nav.Link>
              )}
              <Nav.Link
                data-test="menuCartOverlayLink"
                onClick={() => {
                  overlayContext.show(OverlayType.cart, OverlayTheme.right);
                }}
              >
                Cart
                {cartItemsQuantity > 0 ? (
                  <span className="main-menu__cart__quantity">
                    ({cartItemsQuantity})
                  </span>
                ) : null}
              </Nav.Link>
            </Online>
            <Offline>
              <Nav.Link href={paths.account}>
                <li className="main-menu__offline">
                  <span>
                    <FormattedMessage defaultMessage="Offline" />
                  </span>
                </li>
              </Nav.Link>
            </Offline>
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default MainMenu;
