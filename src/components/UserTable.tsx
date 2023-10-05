// Importing necessary components and hooks
import { DataTable } from "primereact/datatable";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const UserTable = () => {
  // Fetching the users from the UserContext
  const { users } = useContext(UserContext);

  /**
   * Calculates the age of the user based on their birth date.
   * 
   * @param birthDate - The birthdate of the user.
   * @returns The calculated age of the user.
   */
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    // Adjust age if birth date hasn't occurred this year yet
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Extending the user object with an age property
  const extendedUsers = users.map((user) => ({
    ...user,
    age: calculateAge(user.birthDate),
  }));

  // Rendering the table
  return (
    <div style={{ 
      maxWidth: "72rem + 36px", // account for the 12px on both sides
      margin: "0 auto",
      marginTop: "12rem", // adjusted for the padding on the new div
      borderRadius: "8px", // adjusted for the new div
      boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)", 
      padding: "18px", 
      backgroundColor: "#1d1e27" // or any other color you prefer 
    }}>
      <h2 style={{marginLeft: '1rem', color:'rgba(255, 255, 255, 0.87)' }}>User Table</h2>
      <div className="card" style={{ 
        maxWidth: "72rem", 
        margin: "0 auto", 
      }}>
        <DataTable
          dataKey="id"
          value={extendedUsers}
          filters={{
            name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            email: { value: null, matchMode: FilterMatchMode.CONTAINS },
            age: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          }}
          globalFilterFields={["name", "email", "age"]}
          filterDisplay="row"
          sortMode="multiple"
          removableSort
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          emptyMessage="No users found."
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            sortable
            field="name"
            header="Name"
            filter
            filterPlaceholder="Search"
            showFilterMenu={false}
          />
          <Column
            sortable
            field="email"
            header="Email"
            filter
            filterPlaceholder="Search"
            showFilterMenu={false}
          />
          <Column
            sortable
            key="age"
            field="age"
            header="Age"
            filter
            filterPlaceholder="Search"
            showFilterMenu={false}
            style={{ width: "10rem" }}
          />
          <Column field="birthDate" header="Birth Date" />
        </DataTable>
      </div>
    </div>
  );
};

// Exporting the UserTable component
export default UserTable;
