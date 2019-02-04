import React from "react";
import { shallow } from "enzyme";

import App from "./App";
const Enzyme = require("enzyme");
const EnzymeAdapter = require("enzyme-adapter-react-16");

beforeEach(() => {
  Enzyme.configure({ adapter: new EnzymeAdapter() });
});

describe("App.ts test suite - Test checkboxes list", () => {
  it("checkboxes array rendering", () => {
    const component = Enzyme.shallow(<App />);
    expect(component.state("checkboxes").length).toBe(2);
    expect(component.state("checkboxes")[0]).toMatchInlineSnapshot(`
<CheckBoxComponent
  id="over_eighteen"
  required={true}
  text="Over Eighteen"
  type="checkbox"
  updateCheckbox={[Function]}
/>
`);
    expect(component.state("checkboxes")[1]).toMatchInlineSnapshot(`
<CheckBoxComponent
  id="terms_and_conditions"
  required={true}
  text="Terms And Conditions"
  type="checkbox"
  updateCheckbox={[Function]}
/>
`);
  });
});

describe("App.ts test suite - Text render() method of App.ts", () => {
  it("App render page", () => {
    const wrapper = shallow(<App />);
    var formNode = wrapper.find("form");
    var intlTelInputComponent = wrapper.find("IntlTelInputComponent");
    var checkBoxComponent = wrapper.find("CheckBoxComponent");
    var errorMessageSpan = wrapper.find("span");
    var button = wrapper.find("input");
    var div = wrapper.find("div");
    expect(formNode.length).toEqual(1);
    expect(intlTelInputComponent.length).toEqual(1);
    expect(checkBoxComponent.length).toEqual(2);
    expect(errorMessageSpan.length).toEqual(1);
    expect(button.length).toEqual(1);
    expect(button.length).toEqual(1);
    expect(div.length).toEqual(0);
  });

  it("App render page when loading", () => {
    const wrapper = shallow(<App />);

    wrapper.setState({ isLoading: true });
    expect(wrapper.state("isLoading")).toBe(true);

    var formNode = wrapper.find("form");
    var intlTelInputComponent = wrapper.find("IntlTelInputComponent");
    var checkBoxComponent = wrapper.find("CheckBoxComponent");
    var errorMessageSpan = wrapper.find("span");
    var button = wrapper.find("input");
    var div = wrapper.find("div");
    expect(formNode.length).toEqual(0);
    expect(intlTelInputComponent.length).toEqual(0);
    expect(checkBoxComponent.length).toEqual(0);
    expect(errorMessageSpan.length).toEqual(0);
    expect(button.length).toEqual(0);
    expect(div.length).toEqual(1);
  });

  it("App render page when api returns a reponse message", () => {
    const wrapper = shallow(<App />);

    const errorMsg = "Error Message";
    wrapper.setState({ responseMessage: errorMsg });
    expect(wrapper.state("responseMessage")).toBe(errorMsg);

    var formNode = wrapper.find("form");
    var intlTelInputComponent = wrapper.find("IntlTelInputComponent");
    var checkBoxComponent = wrapper.find("CheckBoxComponent");
    var errorMessageSpan = wrapper.find("span");
    var button = wrapper.find("input");
    var div = wrapper.find("div");
    expect(formNode.length).toEqual(0);
    expect(intlTelInputComponent.length).toEqual(0);
    expect(checkBoxComponent.length).toEqual(0);
    expect(errorMessageSpan.length).toEqual(0);
    expect(button.length).toEqual(0);
    expect(div.length).toEqual(1);
  });
});

describe("App.ts test suite - Text render() method of App.ts", () => {
  it('test handleSubmit upon form submit event fires - over eighteen checkbox is unchecked', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ overEighteenCheckboxFlag: false });
    wrapper.setState({ termsAndConditionsCheckboxFlag: true });
    wrapper.setState({ telephoneNumber: '+35799139135' });

    expect(wrapper.state('overEighteenCheckboxFlag')).toBe(false);
    expect(wrapper.state('termsAndConditionsCheckboxFlag')).toBe(true);
    expect(wrapper.state('telephoneNumber')).toBe('+35799139135');

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.text()).toContain('Please fill in the form appropriatelly to continue');
  })

  it('test handleSubmit upon form submit event fires - terms and conditions checkbox is unchecked', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ overEighteenCheckboxFlag: true });
    wrapper.setState({ termsAndConditionsCheckboxFlag: false });
    wrapper.setState({ telephoneNumber: '+35799139135' });

    expect(wrapper.state('overEighteenCheckboxFlag')).toBe(true);
    expect(wrapper.state('termsAndConditionsCheckboxFlag')).toBe(false);
    expect(wrapper.state('telephoneNumber')).toBe('+35799139135');

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.text()).toContain('Please fill in the form appropriatelly to continue');
  })

  it('test handleSubmit upon form submit event fires - phone number is not a number', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ overEighteenCheckboxFlag: true });
    wrapper.setState({ termsAndConditionsCheckboxFlag: true });
    wrapper.setState({ telephoneNumber: 'invalid' });

    expect(wrapper.state('overEighteenCheckboxFlag')).toBe(true);
    expect(wrapper.state('termsAndConditionsCheckboxFlag')).toBe(true);
    expect(wrapper.state('telephoneNumber')).toBe('invalid');

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.text()).toContain('Please fill in the form appropriatelly to continue');
  })

  it('test handleSubmit upon form submit event fires - valid case, with no error message', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ overEighteenCheckboxFlag: true });
    wrapper.setState({ termsAndConditionsCheckboxFlag: true });
    wrapper.setState({ telephoneNumber: '+35799139135' });

    expect(wrapper.state('overEighteenCheckboxFlag')).toBe(true);
    expect(wrapper.state('termsAndConditionsCheckboxFlag')).toBe(true);
    expect(wrapper.state('telephoneNumber')).toBe('+35799139135');

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.text()).toBe('<IntlTelInputComponent /><CheckBoxComponent /><CheckBoxComponent />');
  })
});

