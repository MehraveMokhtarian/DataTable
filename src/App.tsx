import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable,DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

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


export default function App() {
  const API_URL = 'http://localhost:3000/users';
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<DataTableFilterMeta>(
    {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      email: { value: null, matchMode: FilterMatchMode.CONTAINS },
      age: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    }
  );
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const columns: ColumnMeta[] = 
  [
    {field: 'name', header: 'Name'},
    {field: 'email', header: 'Email'},
  ];
  

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        const listUsers = await response.json();
        // Calculate age for each user
        const usersWithAge = listUsers.map((user: any) => ({
          ...user,
          age: calculateAge(new Date(user.birthDate))
        }));
        console.log(usersWithAge);
        setUsers(usersWithAge);
          } catch (err) {
            console.log(err.stack)
          }
        }
        fetchItems()
  }, []);

  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
        <div className="flex justify-content-end">
            <span className="p-input-icon-left" style={{ width: '100%' }}>
                <i className="pi pi-search" />
                <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" style={{ width: '100%' }}/>
            </span>
        </div>
    );
  };
  const header = renderHeader();

  return (
      <div className="card" style={{maxWidth:'72rem'}}>
          <DataTable
            value={users}
            header={header}
            filters={filters}
            globalFilterFields={['name', 'email', 'age']}
            filterDisplay="row"
            dataKey="id"
            sortMode="multiple"
            removableSort
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage="No users found."
            tableStyle={{ minWidth: '50rem' }}>
            {columns.map((col, i) => (
              <Column sortable key={i} field={col.field} header={col.header} filter filterPlaceholder="Search" showFilterMenu={false} />
            ))}
            <Column sortable key='age' field='age' header='Age' filter filterPlaceholder="Search" showFilterMenu={false} style={{ width: '10rem' }}/>
            <Column field="birthDate" header="Birth Date" />
          </DataTable>
      </div>
  );
}

