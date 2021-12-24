import React from "react";
import Spacing from "../../foundation/Spacing";

interface ColorProps {
  hexCode: string;
  height?: keyof typeof Spacing;
  width?: keyof typeof Spacing;
}

const Color: React.FC<ColorProps> = ({
  hexCode,
  width = Spacing.sm,
  height = Spacing.sm,
}) => {
  const className = `dse-width-${width} dse-height-${height}`;
  return (
    <div
      style={{ backgroundColor: hexCode, width, height }}
      className={className}
    ></div>
  );
};

export default Color;
