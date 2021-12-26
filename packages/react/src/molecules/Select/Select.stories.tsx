import React from "react";

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
  title: "Select",
};

export const Common = () => <Select options={options} />;
