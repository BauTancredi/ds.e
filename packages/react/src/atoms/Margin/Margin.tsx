import React from "react";
import { Spacing } from "@ds.e/foundation";

interface MarginProps {
  space?: keyof typeof Spacing;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  left?: boolean;
}

const Margin: React.FC<MarginProps> = ({
  space = "xxxs",
  children,
  left,
  bottom,
  right,
  top,
}) => {
  let className;

  if (!left && !bottom && !right && !top) {
    className = `dse-margin-${space}`;
  }

  if (left) className = `${className} dse-margin-left-${space}`;
  if (bottom) className = `${className} dse-margin-bottom-${space}`;
  if (right) className = `${className} dse-margin-right-${space}`;
  if (top) className = `${className} dse-margin-top-${space}`;

  return <div className={className}>{children}</div>;
};

export default Margin;
