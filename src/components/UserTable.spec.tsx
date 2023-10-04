import { render, screen } from "@testing-library/react";
import UserContext from "../context/UserContext";
import UserTable from "./UserTable";

describe("UserTable", () => {
  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      birthDate: "1990-01-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      birthDate: "2000-05-15",
    },
  ];

  test("renders user data correctly", () => {
    render(
      <UserContext.Provider value={{ users: mockUsers }}>
        <UserTable />
      </UserContext.Provider>,
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("2000-05-15")).toBeInTheDocument();
  });

  test("renders empty message when no users", () => {
    render(
      <UserContext.Provider value={{ users: [] }}>
        <UserTable />
      </UserContext.Provider>,
    );

    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });
});
