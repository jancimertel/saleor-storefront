import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Filter as FilterIcon } from "react-bootstrap-icons";
import { FormattedMessage } from "react-intl";

import { Chip } from "@components/atoms";
import { commonMessages } from "@temp/intl";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductListHeader: React.FC<IProps> = ({
  numberOfProducts = 0,
  openFiltersMenu,
  clearFilters,
  activeSortOption,
  activeFilters = 0,
  activeFiltersAttributes = [],
  sortOptions,
  onChange,
  onCloseFilterAttribute,
}: IProps) => {
  return (
    <Navbar>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" variant="pills">
          <Nav.Link onClick={openFiltersMenu}>
            <FilterIcon />
            <S.Filters>
              <FormattedMessage {...commonMessages.filterHeader} />{" "}
              {activeFilters > 0 && (
                <>
                  <span>({activeFilters})</span>
                </>
              )}
            </S.Filters>
          </Nav.Link>
          {activeFilters > 0 && (
            <Nav.Link onClick={clearFilters} data-test="clearFiltersButton">
              <FormattedMessage {...commonMessages.clearFilterHeader} />
            </Nav.Link>
          )}
        </Nav>
        <Nav variant="pills">
          <Navbar.Text>
            <FormattedMessage defaultMessage="Products found:" />{" "}
            {numberOfProducts}
          </Navbar.Text>
          <NavDropdown
            onSelect={(event, eventKey) => {}}
            id="sorting"
            title={<FormattedMessage defaultMessage="Sort by:" />}
          >
            {sortOptions.map((option, i) => (
              <NavDropdown.Item eventKey={option.value} key={i}>
                {option.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      {activeFiltersAttributes.map(
        ({ attributeSlug, valueName, valueSlug }) => (
          <Chip
            onClose={() => onCloseFilterAttribute(attributeSlug, valueSlug)}
          >
            {valueName}
          </Chip>
        )
      )}
    </Navbar>
  );
};
