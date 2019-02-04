import CheckBoxComponent from "./CheckBoxComponent";
import TestRenderer from "react-test-renderer";
import React from "react";

const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

describe("Test render() method of CheckBoxComponent", () => {
  beforeEach(() => {
    Enzyme.configure({ adapter: new EnzymeAdapter() });
  });

  it("CheckBoxComponent rendering", () => {
    const tree = TestRenderer.create(<CheckBoxComponent />).toJSON();
    expect(tree).toMatchInlineSnapshot(`
<div>
  <input
    id={[Function]}
    onChange={[Function]}
    required={true}
    type="checkbox"
  />
</div>
`);
  });
});
