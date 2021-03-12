import { NextRouter } from "next/router";
import * as React from "react";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { AsyncTypeahead } from "react-bootstrap-typeahead"; // ES2015
import { injectIntl, WrappedComponentProps } from "react-intl";

import { SearchResults } from "@temp/components/Search/gqlTypes/SearchResults";
import { channelSlug } from "@temp/constants";
import { maybe } from "@temp/core/utils";

import { TypedSearchResults } from "./queries";

import "./scss/index.scss";

interface SearchProps extends WrappedComponentProps {
  router?: NextRouter;
  className?: string;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = props => {
  const [search, setSearch] = useState("");

  const handleSearch = query => {
    setSearch(query);
  };

  // Bypass client-side filtering by returning `true`. Results are already
  // filtered by the search endpoint, so no need to do it again.
  const filterBy = () => true;

  const hasResults = (data: SearchResults) =>
    maybe(() => !!data.products.edges.length);

  return (
    <div className="search-box">
      <InputGroup size="lg">
        <InputGroup.Prepend>
          <InputGroup.Text>
            <SearchIcon />
          </InputGroup.Text>
        </InputGroup.Prepend>
        <TypedSearchResults
          renderOnError
          displayError
          errorPolicy="all"
          variables={{
            channel: channelSlug,
            query: search,
          }}
        >
          {({ data, error, loading }) => {
            let options = [];
            if (hasResults(data)) {
              options = data.products.edges.map(i => ({
                avatar_url: i.node.thumbnail.url,
                id: i.node.id,
                name: i.node.name,
              }));
            }
            return (
              <AsyncTypeahead
                filterBy={filterBy}
                id="async-example"
                isLoading={loading}
                labelKey="name"
                minLength={3}
                delay={1000}
                onSearch={handleSearch}
                options={options}
                placeholder={props.placeholder}
                renderMenuItemChildren={(option, props) => (
                  <>
                    <img
                      alt={option.name}
                      src={option.avatar_url}
                      style={{
                        height: "24px",
                        marginRight: "10px",
                        width: "24px",
                      }}
                    />
                    <span>{option.name}</span>
                  </>
                )}
              />
            );
          }}
        </TypedSearchResults>
      </InputGroup>
    </div>
  );
};

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default injectIntl(Search);
