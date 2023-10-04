import { useState, useEffect } from "react";
import { IUser, getUsers } from "./services/userService";
import UserContext from "./context/UserContext";
import UserTable from "./components/UserTable";

export default function App() {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetched = await getUsers();
      setUsers(fetched);
    };
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      <UserTable />
    </UserContext.Provider>
  );
}
