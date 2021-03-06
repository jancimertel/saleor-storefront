/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import classNames from "classnames";
import * as React from "react";

import { NavLink, OverlayContextInterface } from "..";
import { MainMenu_menu_items } from "../Search/gqlTypes/MainMenu";
import NavItem from "./NavItem";

class NavDropdown extends React.PureComponent<
  MainMenu_menu_items & {
    overlay: OverlayContextInterface;
    showDropdown: boolean;
    onShowDropdown: () => void;
    onHideDropdown: () => void;
  }
> {
  render() {
    const {
      children,
      showDropdown,
      onShowDropdown,
      onHideDropdown,
    } = this.props;

    return (
      <ul
        className={classNames({
          "main-menu__nav-dropdown": true,
          "main-menu__nav-dropdown--active": showDropdown,
        })}
        onMouseOver={onShowDropdown}
        onMouseLeave={onHideDropdown}
      >
        <li>
          <NavLink item={this.props} onClick={onHideDropdown} />
        </li>
        <li
          className={classNames({
            "main-menu__nav-dropdown__body": true,
            "main-menu__nav-dropdown__body--visible": showDropdown,
          })}
        >
          <ul>
            {children.map((subItem, i) => (
              <NavItem key={i} hideOverlay={onHideDropdown} {...subItem} />
            ))}
          </ul>
        </li>
      </ul>
    );
  }
}

export default NavDropdown;
