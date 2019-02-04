import React, { Component } from 'react';

export default class CheckBoxComponent extends Component {

  state = {
    id: '',
  }

  constructor() {
    super()
    this.checkboxHandler = this.checkboxHandler.bind(this);
  }

  checkboxHandler = () => {
    this.props.updateCheckbox(this.props);
  }

  idHandler = () => {
    this.setState({  
      id: this.props.id
    });
  }

  render() {
    return (
      <div><input 
      id={this.idHandler}
      onChange={this.checkboxHandler}
      required={true}
      type="checkbox" />{this.props.text}</div>
    );
  }
}