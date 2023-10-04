import { useState, useEffect, createContext } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTableFilterMeta } from 'primereact/datatable';

interface User {
    id: number;
    name: string;
    email: string;
    birthDate: string; 
    age: number;
}

const DataContext = createContext({})

export const DataProvider({children}) = {
  const API_URL = 'http://localhost:3000/users';
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
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
        //console.log(listUsers);
        setUsers(listUsers);
      } catch (err) {
        console.log(err.stack)
      }
    }

    fetchItems()
  }, []);

  return (
    <DataContext.Provider value={{

    }}>
        {children}
    </DataContext.Provider>
  )
}

export default DataContext;
