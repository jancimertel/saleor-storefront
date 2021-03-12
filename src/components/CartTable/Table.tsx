import * as React from "react";

import { EditableProductRowProps, ILine } from "./ProductRow";

interface TableProps extends EditableProductRowProps {
  lines: ILine[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: string;
}

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  totalCost,
  discount,
  discountName,
  lines,
  ...rowProps
}) => {
  return <table className="cart-table" />;
};

export default Table;
