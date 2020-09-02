import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Root } from "../mst";

interface EmployerComponentProps {
  rootTree?: Root;
}

interface EmployerComponentState {}

@inject("rootTree")
@observer
class Employer extends Component<
  EmployerComponentProps,
  EmployerComponentState
> {
  constructor(props: EmployerComponentProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { rootTree } = this.props;
    if (!rootTree) return null;

    return (
      <div>
        <h1>{rootTree.employer.name}</h1>
        <h3>{rootTree.employer.location}</h3>
        <hr />
      </div>
    );
  }
}

export default Employer;
