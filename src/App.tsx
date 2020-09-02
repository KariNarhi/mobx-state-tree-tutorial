import React, { Component } from "react";
import { Provider } from "mobx-react";
import "./App.css";
import { setupRootStore } from "./mst/setup";
import Employer from "./components/Employer";

interface Props {}

interface State {
  rootTree: any;
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      rootTree: null,
    };
  }

  // Setup store after mounting
  componentDidMount = () => {
    const { rootTree } = setupRootStore();
    this.setState({
      rootTree,
    });
  };

  render() {
    const { rootTree } = this.state;
    if (!rootTree) return null;

    return (
      <Provider rootTree={rootTree}>
        <Employer />
      </Provider>
    );
  }
}

export default App;
