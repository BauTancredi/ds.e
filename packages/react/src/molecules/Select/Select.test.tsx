import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Select from "./Select";

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

describe("Select", () => {
  it("renders all options passed to it", () => {
    const { getAllByRole, getByTestId } = render(<Select options={options} />);

    fireEvent.click(getByTestId("DseSelectButton"));

    expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
  });

  it("renders options using custom renderOption method if passed as prop", () => {
    const { getAllByTestId, getByTestId } = render(
      <Select
        options={options}
        renderOption={({ option, getOptionRecommendedProps }) => {
          return (
            <li
              data-testid="CustomRenderOption"
              {...getOptionRecommendedProps({})}
            >
              {option.label}
            </li>
          );
        }}
      />
    );

    fireEvent.click(getByTestId("DseSelectButton"));

    expect(getAllByTestId("CustomRenderOption")).toHaveLength(options.length);
  });

  it("calls the onOptionSelected prop with the selected options and its index if passed", () => {
    const onOptionSelected = jest.fn();
    const { getAllByRole, getByTestId } = render(
      <Select options={options} onOptionSelected={onOptionSelected} />
    );

    fireEvent.click(getByTestId("DseSelectButton"));

    fireEvent.click(getAllByRole("menuitemradio")[0]);

    expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0);
  });

  it("the button label changes to the selected option label", () => {
    const { getAllByRole, getByTestId } = render(<Select options={options} />);

    fireEvent.click(getByTestId("DseSelectButton"));

    fireEvent.click(getAllByRole("menuitemradio")[0]);

    expect(getByTestId("DseSelectButton")).toHaveTextContent(options[0].label);
  });

  it("can customize select label", () => {
    const { getByText } = render(
      <Select options={options} label="This is a custom label" />
    );

    expect(getByText(/This is a custom label/)).toBeInTheDocument();
  });

  it("snapshot of the selected option state", () => {
    const { getAllByRole, getByTestId, asFragment } = render(
      <Select options={options} />
    );

    fireEvent.click(getByTestId("DseSelectButton"));

    fireEvent.click(getAllByRole("menuitemradio")[0]);

    expect(asFragment()).toMatchSnapshot();
  });

  it("snapshot of the base state", () => {
    const { asFragment } = render(<Select options={options} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("snapshot of the options menu open states", () => {
    const { getByTestId, asFragment } = render(<Select options={options} />);

    fireEvent.click(getByTestId("DseSelectButton"));

    expect(asFragment()).toMatchSnapshot();
  });
});
