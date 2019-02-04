import React, { Component } from 'react';
import IntlTelInput from 'react-intl-tel-input';

export default class IntlTelInputComponent extends Component {

    onInputNewNumberHandler = (status, value, countryData, number) => {
        this.props.onInputNumberHandler(
            countryData && countryData.dialCode
            ? '+' + countryData.dialCode.concat(value).toString()
            : '');
    };

    render() {
        return (<IntlTelInput
            css={['intl-tel-input', 'form-control', 'required']}
            defaultCountry={'cy'}
            onPhoneNumberChange={this.onInputNewNumberHandler}
            value={this.props.isPhoneValid} />
        )
    }
}