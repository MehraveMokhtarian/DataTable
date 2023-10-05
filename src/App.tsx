// Importing necessary React hooks and services.
import { useState, useEffect } from "react";
import { IUser, getUsers } from "./services/userService";
// Importing context and components.
import UserContext from "./context/UserContext";
import UserTable from "./components/UserTable";

export default function App() {
  // State to hold the users data.
  const [users, setUsers] = useState<IUser[]>([]);

  // `useEffect` hook to fetch user data when the component mounts.
  useEffect(() => {
    const fetchUsers = async () => {
      // Fetch users from the service.
      const fetched = await getUsers();
      // Update the state with fetched users.
      setUsers(fetched);
    };
    // Calling the async function to fetch users.
    fetchUsers();
    // Empty dependency array ensures this useEffect runs only once, similar to componentDidMount.
  }, []);

  // Using the `UserContext` to provide the fetched users data to child components.
  return (
    <UserContext.Provider value={{ users }}>
      <UserTable />
    </UserContext.Provider>
  );
}
