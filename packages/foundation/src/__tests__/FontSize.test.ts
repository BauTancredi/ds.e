import FontSize from "../FontSize";

describe("FontSize", () => {
  it("snapshot of fontsizes", () => {
    expect(FontSize).toMatchSnapshot();
  });
});
