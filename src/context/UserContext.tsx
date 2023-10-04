import { createContext } from "react";
import { IUser } from "../services/userService";

export interface IUserTableData {
  users: IUser[];
}

const UserContext = createContext<IUserTableData>({
  users: [],
});

export default UserContext;
