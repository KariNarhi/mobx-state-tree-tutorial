import React, { Component } from "react";
import { EmployeeType } from "../mst";
import { observer, inject } from "mobx-react";

interface EmployeeComponentProps {
  employee: EmployeeType;
}

interface EmployeeComponentState {
  employeeName: string;
  hours_worked: string;
  edit: boolean;
}

@inject("rootTree")
@observer
class Employee extends Component<
  EmployeeComponentProps,
  EmployeeComponentState
> {
  constructor(props: EmployeeComponentProps) {
    super(props);
    this.state = {
      employeeName: this.props.employee.name,
      hours_worked: `${this.props.employee.hours_worked}`,
      edit: false,
    };
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as any);
  };

  toggleEdit = () => {
    this.setState((prev) => ({ edit: !prev.edit }));
  };

  onSubmit = (e: any) => {
    e.preventDefault();

    const { employeeName, hours_worked } = this.state;
    this.props.employee.editEmployee(employeeName, parseInt(hours_worked));
    this.toggleEdit();
  };

  render() {
    const { name, hours_worked } = this.props.employee;

    const { edit } = this.state;

    return (
      <div>
        {edit ? (
          <form onSubmit={this.onSubmit}>
            <input
              name="employeeName"
              value={this.state.employeeName}
              onChange={this.onChange}
              type="text"
            />
            <input
              name="hours_worked"
              value={this.state.hours_worked}
              onChange={this.onChange}
              type="text"
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={this.toggleEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>{`Name: ${name}`}</p>
            <p>{`Work hours: ${hours_worked}`}</p>
            <button onClick={this.toggleEdit}>Edit</button>
          </>
        )}
      </div>
    );
  }
}

export default Employee;
