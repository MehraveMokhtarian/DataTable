import { useState, useEffect,createContext } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';

interface User {
    id: number;
    name: string;
    email: string;
    birthDate: string; 
    age: number;
}

interface ColumnMeta {
  field: string;
  header: string;
}

export function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDifference = today.getMonth() - birth.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
  }
  return age;
}

const DataContext = createContext({});

export const DataProvider = ({children}) => {
  const API_URL = 'http://localhost:3000/users';
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const columns: ColumnMeta[] = [
    {field: 'name', header: 'Name'},
    {field: 'email', header: 'Email'},
    {field: 'age', header: 'Age'},
    {field: 'birthDate', header: 'Birthdate'}
  ];
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.IN },
    age: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listUsers = await response.json();
        console.log(listUsers);
        setUsers(listUsers);
      } catch (err) {
        console.log(err.stack)
      }
    }

    fetchItems()
  }, []);

  return (
    <DataContext.Provider value={{
      users,search,columns,filters,setSearch,setFilters
    }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataContext;
