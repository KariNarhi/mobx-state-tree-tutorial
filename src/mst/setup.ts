import { RootModel } from ".";
import { onSnapshot } from "mobx-state-tree";

// Setup store
export const setupRootStore = () => {
  const rootTree = RootModel.create({
    employer: {
      id: "1",
      name: "Bob's Burgers",
      location: "New York NY",
      employees: [],
    },
  });

  // Log snapshot changes
  onSnapshot(rootTree, (snapshot) => console.log("snapshot: ", snapshot));

  return { rootTree };
};
