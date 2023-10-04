import { DataTable } from "primereact/datatable";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";

const UserTable = () => {
  const { users } = useContext(UserContext);
  /**
   * this function calculates the age based on current time
   * @param birthDate birthdate of the user
   * @returns Age of the user
   */
  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  const extendedUsers = users.map((user) => ({
    ...user,
    age: calculateAge(user.birthDate),
  }));

  return (
    <div className="card" style={{ maxWidth: "72rem" }}>
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
        rows={5}
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
  );
};

export default UserTable;
