import React, { Component } from "react";
import "./App.css";

interface Props {}

interface State {}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p>Hi there</p>
      </div>
    );
  }
}

export default App;
