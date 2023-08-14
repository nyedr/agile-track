import { useState } from "react";
import { Role, User } from "@prisma/client";

interface EmployeeSelectProps {
  role?: Role;
}

const EmployeeSelect = ({ role }: EmployeeSelectProps) => {
  const [employees, setEmployees] = useState<User[]>([]);

  const getEmployees = async () => {
    const res = await fetch(`/api/employees?role=${role}`);
    const data = await res.json();
    setEmployees(data);
  };

  return (
    <div>
      <h1>EmployeeSelect</h1>
    </div>
  );
};

export default EmployeeSelect;
