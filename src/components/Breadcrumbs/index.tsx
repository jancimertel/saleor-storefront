import * as React from "react";
import { Breadcrumb as BsBreadcrumb } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

import { paths } from "@paths";
import { commonMessages } from "@temp/intl";

import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Category_category } from "../../views/Category/gqlTypes/Category";

export interface Breadcrumb {
  value: string;
  link: string;
}

export const extractBreadcrumbs = (category: Category_category) => {
  const constructLink = item => ({
    link: [
      `/category`,
      `/${slugify(item.name)}`,
      `/${getDBIdFromGraphqlId(item.id, "Category")}/`,
    ].join(""),
    value: item.name,
  });

  let breadcrumbs = [constructLink(category)];

  if (category.ancestors.edges.length) {
    const ancestorsList = category.ancestors.edges.map(edge =>
      constructLink(edge.node)
    );
    breadcrumbs = ancestorsList.concat(breadcrumbs);
  }
  return breadcrumbs;
};

const Breadcrumbs: React.FC<{
  breadcrumbs: Breadcrumb[];
}> = ({ breadcrumbs }) => (
  <>
    <BsBreadcrumb className="breadcrumbs">
      <BsBreadcrumb.Item href={paths.home}>
        <FormattedMessage {...commonMessages.home} />
      </BsBreadcrumb.Item>
      {breadcrumbs.map((breadcrumb, index) => (
        <BsBreadcrumb.Item
          href={breadcrumb.link}
          key={`${breadcrumb.value}-${index}`}
          active={index === breadcrumbs.length - 1}
        >
          {breadcrumb.value}
        </BsBreadcrumb.Item>
      ))}
    </BsBreadcrumb>
  </>
);

export default Breadcrumbs;
