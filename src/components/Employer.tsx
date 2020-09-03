import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { RootType } from "../mst";
import Employee from "./Employee";

interface EmployerComponentProps {
  rootTree?: RootType;
}

interface EmployerComponentState {
  employeeName: string;
  hours_worked: string;
  searchString: string;
}

@inject("rootTree")
@observer
class Employer extends Component<
  EmployerComponentProps,
  EmployerComponentState
> {
  constructor(props: EmployerComponentProps) {
    super(props);
    this.state = {
      employeeName: "",
      hours_worked: "",
      searchString: "",
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  onSubmit = (e: any) => {
    e.preventDefault();

    const { employeeName, hours_worked } = this.state;
    const { rootTree } = this.props;

    if (!rootTree) return null;
    rootTree.employer.newEmployee(employeeName, parseInt(hours_worked));

    this.setState({
      employeeName: "",
      hours_worked: "",
    });
  };

  render() {
    const { rootTree } = this.props;
    const { employeeName, hours_worked, searchString } = this.state;
    if (!rootTree) return null;

    const num_employees = rootTree.employer.num_employees;

    const filtered_employees = rootTree.employer.filtered_employees(
      searchString
    );

    return (
      <div>
        <h1>{rootTree.employer.name}</h1>
        <h3>{rootTree.employer.location}</h3>
        <p> {`Total number of employees: ${num_employees}`} </p>
        <hr />
        <p>New Employee</p>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="employeeName">Name: </label>
          <input
            value={employeeName}
            name="employeeName"
            onChange={this.onChange}
            type="text"
          />
          <br />
          <br />
          <label htmlFor="hours_worked">Hours Worked: </label>
          <input
            value={hours_worked}
            name="hours_worked"
            onChange={this.onChange}
            type="text"
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
        <hr />
        <input
          placeholder="Search employee"
          name="searchString"
          value={searchString}
          onChange={this.onChange}
          type="text"
        />
        <br />
        <br />
        {filtered_employees.map((employee) => (
          <Employee employee={employee} key={employee.id} />
        ))}
      </div>
    );
  }
}

export default Employer;
