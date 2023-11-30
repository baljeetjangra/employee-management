"use client";
import { cachedApiAgent } from "@/lib/apiAgent";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { map } from "lodash";
import EmployeeCard from "./EmployeeCard";
import { useEmployeeStore } from "@/store/zustand";
import DeleteEmployeeDialog from "./EmployeeDeleteConfitmation";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const editEmployee = useEmployeeStore((state) => state.editEmployee);
  const editEmp = useEmployeeStore((state) => state.employeeDetails);
  console.log("deta", editEmp);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await cachedApiAgent.get("/employees");
        setEmployees(res?.data?.data);
      } catch (error: any) {
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    };
    fetchEmployees();
  }, []);

  const handleEdit = (emp: Employee) => {
    editEmployee(emp);
  };

  const handleDelete = (emp: Employee) => {
    setDeleteDialogOpen(true);
    setSelectedEmployee(emp);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleConfirmDelete = async () => {
    // Implement the logic to delete the employee

    handleCloseDeleteDialog();
  };
  return (
    <div className="gap-4 flex flex-col">
      {map(employees, (emp: any) => (
        <div>
          <EmployeeCard
            name={emp.employee_name}
            imageUrl={emp.profile_image}
            onEdit={() => handleEdit(emp)}
            onDelete={() => handleDelete(emp)}
          />
        </div>
      ))}

      {/* Delete Employee Dialog */}
      <DeleteEmployeeDialog
        isOpen={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onDeleteConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default EmployeeList;
