const mockdata = require("./mockdata.json");

const BASE_URL = "http://not-needed-when-mocked";

export interface IUser {
  id: number;
  name: string;
  email: string;
  birthDate: string;
}

export const getUsers = (): Promise<IUser[]> => {
  // fake fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockdata.users);
    }, 1000);
  });
};
