import React, { Component } from 'react';
import IntlTelInputComponent from './IntlTelInputComponent';
import CheckBoxComponent from './CheckBoxComponent';
import 'react-intl-tel-input/dist/main.css';
import './css/App.css';

export default class App extends Component {
  url = 'http://localhost:4000/api/sms-promocode';

  errorResponseMessage = 'Please fill in the form appropriatelly to continue';

  state = {};

  checkboxInfo = {
    overEighteen: {
      id: 'over_eighteen',
      text: 'Over Eighteen'
    },
    termsAndConditions: {
      id: 'terms_and_conditions',
      text: 'Terms And Conditions'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      checkboxes: [],
      isLoading: false,
      invalidNumberMessage: '',
      responseMessage: '',
      numberValidationErroMsg: '',
      telephoneNumber: '',
      overEighteenCheckboxFlag: false,
      termsAndConditionsCheckboxFlag: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdateCheckboxHandler = this.handleUpdateCheckboxHandler.bind(this);

    this.handleUpdatePhoneNumberState = this.handleUpdatePhoneNumberState.bind(this);
    this.handleLoadingState = this.handleLoadingState.bind(this);
    this.handleResponseMessageState = this.handleResponseMessageState.bind(this);
    this.handleNumberValidationErroMsgState = this.handleNumberValidationErroMsgState.bind(this);
    this.handleInvalidNumberMessage = this.handleInvalidNumberMessage.bind(this);
    this.handleOverEighteenCheckboxState = this.handleOverEighteenCheckboxState.bind(this);
    this.handleTermsAndConditionsCheckboxState = this.handleTermsAndConditionsCheckboxState.bind(this);

    this.prepareCheckboxes();
  }

  handleUpdatePhoneNumberState(updatedNumber) {
    this.setState({ telephoneNumber: updatedNumber });
  }

  handleLoadingState(state) {
    this.setState({ isLoading: state });
  }

  handleResponseMessageState(message) {
    this.setState({ responseMessage: message });
  }

  handleNumberValidationErroMsgState(message) {
    this.setState({ numberValidationErroMsg: message });
  }

  handleInvalidNumberMessage(message) {
    this.setState({ invalidNumberMessage: message });
  }

  handleOverEighteenCheckboxState() {
    this.setState({ overEighteenCheckboxFlag: !this.state.overEighteenCheckboxFlag });
  }

  handleTermsAndConditionsCheckboxState() {
    this.setState({ termsAndConditionsCheckboxFlag: !this.state.termsAndConditionsCheckboxFlag });
  }

  handleUpdateCheckboxHandler(checkbox) {
    checkbox.id === 'over_eighteen'
      ? this.handleOverEighteenCheckboxState()
      : this.handleTermsAndConditionsCheckboxState();
  }

  prepareCheckboxes() {
    Object.keys(this.checkboxInfo).forEach((property) => {
      const info = this.checkboxInfo[property];
      this.state.checkboxes.push(<CheckBoxComponent
        key={info.id}
        id={info.id}
        text={info.text}
        type="checkbox"
        updateCheckbox={this.handleUpdateCheckboxHandler}
        required />)
    });
  }

  isPhoneNumber(phoneNumber) {
    return new RegExp(/^[+][(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).test(phoneNumber);
  }

  goBackFromErrorToForm() {
    setTimeout(() => {
      this.handleResponseMessageState('');
    }, 5000);
  }

  isValid() {
    return (
      this.state.overEighteenCheckboxFlag &&
      this.state.termsAndConditionsCheckboxFlag &&
      this.state.telephoneNumber &&
      this.isPhoneNumber(this.state.telephoneNumber)
    )
  }

  messageExists() {
    return (!this.state.isLoading
      && this.state.responseMessage
      && this.state.responseMessage !== '');
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
    else if (this.messageExists()) {
      this.goBackFromErrorToForm();
      return <div>{this.state.responseMessage}</div>
    }
    else {
      return (
        <form
          className="form"
          onSubmit={this.handleSubmit}>
          <IntlTelInputComponent required
            onInputNumberHandler={this.handleUpdatePhoneNumberState} />
          <br />
          <span>{this.state.numberValidationErroMsg}</span>
          <br />
          <br />
          {this.state.checkboxes}
          <input
            type="submit"
            value="Submit"
            className="btn btn-default button" />
        </form>
      )
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleResponseMessageState('');
    if (this.isValid()) {
      this.handleLoadingState(true);
      fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Access-Control-Allow-Origin": "*"
        },
        mode: 'cors',
        body: JSON.stringify({ phone: this.state.telephoneNumber })
      })
        .then(response => response.json())
        .then(res => {
          this.handleResponseMessageState(res.message);
        })
        .catch((error) => {
          this.handleResponseMessageState(error.message);
        });
    } else {
      this.handleNumberValidationErroMsgState(this.errorResponseMessage);
    }
    this.handleLoadingState(false);
  }
}