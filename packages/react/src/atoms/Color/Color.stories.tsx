import React from "react";
import { text, select } from "@storybook/addon-knobs";
import { Spacing } from "@ds.e/foundation";

import Color from "./Color";

import "@ds.e/scss/lib/Utilites.css";

export default {
  title: "Atoms/Color",
};

export const Common = () => <Color hexCode={text("Hexcode", "#000")} />;

export const CustomDimensions = () => (
  <Color
    hexCode={text("Hexcode", "#000")}
    height={select("Height", Object.values(Spacing), "xxl")}
    width={select("Width", Object.values(Spacing), "xxl")}
  />
);
