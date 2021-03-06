import Link from "next/link";
import * as React from "react";

import {
  generateCategoryUrl,
  generateCollectionUrl,
  generatePageUrl,
} from "../../core/utils";
import {
  SecondaryMenu_menu_items,
  SecondaryMenu_menu_items_children,
} from "../Footer/gqlTypes/SecondaryMenu";
import { MainMenu_menu_items } from "../Search/gqlTypes/MainMenu";
import { MainMenuSubItem } from "../Search/gqlTypes/MainMenuSubItem";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  item:
    | MainMenu_menu_items
    | MainMenuSubItem
    | SecondaryMenu_menu_items
    | SecondaryMenu_menu_items_children;
}
export const NavLink: React.FC<NavLinkProps> = ({ item, ...props }) => {
  const { name, url, category, collection, page } = item;
  const link = (url: string) => (
    <Link passHref href={url}>
      <a {...props}>{name}</a>
    </Link>
  );

  if (url) {
    return (
      <a href={url} {...props}>
        {name}
      </a>
    );
  }
  if (category) {
    return link(generateCategoryUrl(category.id, category.name));
  }
  if (collection) {
    return link(generateCollectionUrl(collection.id, collection.name));
  }
  if (page) {
    return link(generatePageUrl(page.slug));
  }

  return <span {...props}>{name}</span>;
};
