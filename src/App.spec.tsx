import { render, screen, act } from "@testing-library/react";
import App from "./App";
import { IUser, getUsers } from "./services/userService";

jest.mock("./services/userService", () => ({
    getUsers: jest.fn()
}));

describe("App", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("fetches and displays users", async () => {

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


        render(<App />);
        // for useEffect
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        expect(screen.getByText(/Mehrave/)).toBeInTheDocument();
        expect(screen.getByText(/Mokhtarian/)).toBeInTheDocument();
    });
});
