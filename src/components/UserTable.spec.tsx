// Importing required utilities and components for testing
import { render, screen } from "@testing-library/react";
import UserContext from "../context/UserContext";
import UserTable from "./UserTable";

// Describing a suite of tests for the UserTable component
describe("UserTable", () => {
  // Mocked user data for testing
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

  // Test to ensure user data renders correctly in the table
  test("renders user data correctly", () => {
    // Rendering the UserTable component with mocked data
    render(
      <UserContext.Provider value={{ users: mockUsers }}>
        <UserTable />
      </UserContext.Provider>,
    );

    // Assertions to verify that the user data is present in the document
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("2000-05-15")).toBeInTheDocument();
  });

  // Test to check the display of an empty message when no user data is available
  test("renders empty message when no users", () => {
    // Rendering the UserTable component without user data
    render(
      <UserContext.Provider value={{ users: [] }}>
        <UserTable />
      </UserContext.Provider>,
    );

    // Assertion to confirm that the empty message is displayed
    expect(screen.getByText("No users found.")).toBeInTheDocument();
  });
});
