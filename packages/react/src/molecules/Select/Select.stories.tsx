import React from "react";
import { withA11y } from "@storybook/addon-a11y";

import Select from "./Select";

import "@ds.e/scss/lib/Select.css";

const options = [
  {
    value: "option-1",
    label: "Option 1",
  },
  {
    value: "option-2",
    label: "Option 2",
  },
  {
    value: "option-3",
    label: "Option 3",
  },
];

export default {
  title: "Molecules/Select",
  decorators: [withA11y],
};

export const Common = () => <Select options={options} />;

export const RenderOption = () => (
  <Select
    options={options}
    renderOption={({ option, getOptionRecommendedProps, isSelected }) => (
      <span {...getOptionRecommendedProps({})}>
        {option.label} {isSelected ? "SELECTED!" : ""}
      </span>
    )}
  />
);

export const CustomLabel = () => (
  <Select options={options} label="Custom label here" />
);
