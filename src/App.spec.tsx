// Importing the necessary modules from the testing library and the components/services to be tested.
import { render, screen } from "@testing-library/react";
import App from "./App";
import { IUser, getUsers } from "./services/userService";

// Mocking the `getUsers` function from the userService to control its behavior in tests.
jest.mock("./services/userService", () => ({
    getUsers: jest.fn()
}));

describe("App", () => {
    // Clearing all mocks after each test to ensure there are no residues that might affect other tests.
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("fetches and displays users", async () => {
        // Mocking the resolved value for the `getUsers` function call.
        (getUsers as jest.Mock).mockResolvedValueOnce([{
            "id": 1,
            "name": "Mehrave",
            "email": "john@example.com",
            "birthDate": "1990-05-15"
        },
        {
            "id": 2,
            "name": "Mokhtarian",
            "email": "jane@example.com",
            "birthDate": "1995-03-20"
        }]);

        // Rendering the main App component for the test.
        render(<App />);
        
        // Introducing a delay of 1 second. This corresponds to the delay in the mock `getUsers` function.
        // This ensures that any effects or async operations complete before assertions are made.
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        // Checking if the rendered component contains the mocked user data.
        expect(screen.getByText(/Mehrave/)).toBeInTheDocument();
        expect(screen.getByText(/Mokhtarian/)).toBeInTheDocument();
    });
});
