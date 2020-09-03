import {
  types,
  Instance,
  applySnapshot,
  flow,
  onSnapshot,
} from "mobx-state-tree";
import { v4 as uuid_v4 } from "uuid";
import api from "axios";

const EmployeeModel = types
  .model("Employee", {
    id: types.identifier,
    name: types.string,
    hours_worked: types.number,
  })
  .actions((self) => {
    function editEmployee(name: string, hours_worked: number) {
      applySnapshot(self, {
        ...self,
        name,
        hours_worked,
      });
    }
    return { editEmployee };
  });

const EmployerModel = types
  .model("Employer", {
    id: types.identifier,
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel),
  })
  .actions((self) => {
    function newEmployee(name: string, hours_worked: number) {
      const id = uuid_v4();
      applySnapshot(self, {
        ...self,
        employees: [{ id, name, hours_worked }, ...self.employees],
      });
    }
    const save = flow(function* save(snapshot: any) {
      try {
        // eslint-disable-next-line
        const response = yield api.post(
          "https://jsonplaceholder.typicode.com/posts",
          { snapshot }
        );
      } catch (e) {
        console.log("Error: ", e);
      }
    });
    function afterCreate() {
      onSnapshot(self, (snapshot) => save(snapshot));
    }
    return { newEmployee, save, afterCreate };
  })
  .views((self) => ({
    get num_employees() {
      return self.employees.length;
    },
    filtered_employees(searchString: string) {
      return self.employees.filter((employee) =>
        employee.name.includes(searchString)
      );
    },
  }));

const RootModel = types.model("Root", {
  employer: EmployerModel,
});

export { RootModel };

export type RootType = Instance<typeof RootModel>;
export type EmployerType = Instance<typeof EmployerModel>;
export type EmployeeType = Instance<typeof EmployeeModel>;
