import React, { Component } from 'react';

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      name: props.name
    };
  }

  onAdd = () => {
    this.setState(prevState => ({ value: prevState.value + 1 }));
  };

  render() {
    const { value, name } = this.state;
    return (
      <div style={{ margin: '50px' }}>
        <p>Name: {`${name}`}</p>
        <div style={{ margin: '50px 0' }}>Value: {`${value}`}</div>
        <button onClick={this.onAdd}>Click</button>
      </div>
    );
  }
}
