// Importing the mock data JSON file.
const mockdata = require("./mockdata.json");
// Defining a constant for the BASE_URL, but it's not used because we're using mock data.
const BASE_URL = "http://not-needed-when-mocked";

// Interface to type the user data. This provides a structured and predictable shape for the user data.
export interface IUser {
  id: number;        // Unique identifier for the user.
  name: string;      // Full name of the user.
  email: string;     // Email address of the user.
  birthDate: string; // Date of birth of the user.
}

// Function to get users. In a real-world scenario, this would fetch data from the BASE_URL. 
// However, in this mock scenario, it simulates a fetch request and returns the mock data after a delay.
export const getUsers = (): Promise<IUser[]> => {
  // Simulating a fetch request using a Promise.
  return new Promise((resolve) => {
    // Introducing an artificial delay of 1 second to mimic the behavior of a real fetch call.
    setTimeout(() => {
      // Resolving the promise with the mock user data.
      resolve(mockdata.users);
    }, 1000);
  });
};
