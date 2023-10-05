// Importing required utilities for context creation from React
import { createContext } from "react";
// Importing the user type from the userService module
import { IUser } from "../services/userService";

// Defining the shape of the data expected in the UserTable, mainly the users' list
export interface IUserTableData {
  users: IUser[];
}

// Creating a new context for the user table data.
// This context will provide an interface for components to consume user-related data.
// By default, it's initialized with an empty array of users.
const UserContext = createContext<IUserTableData>({
  users: [],
});

// Exporting the created context to be used by other components
export default UserContext;
