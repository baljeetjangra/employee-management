"use client";
import { axiosInstance } from "@/lib/apiAgent";
import React, { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import { map } from "lodash";
import EmployeeCard from "./EmployeeCard";
import { useEmployeeStore } from "@/store/zustand";
import DeleteEmployeeDialog from "./EmployeeDeleteConfitmation";
import { useRouter } from "next/navigation";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const router = useRouter();
  const editEmployee = useEmployeeStore((state) => state.editEmployee);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/users");
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
    try {
      await axiosInstance.delete(`/users/${selectedEmployee?.id}`);
      handleCloseDeleteDialog();
      toast({
        description: "User deleted successfully!",
      });
    } catch (error: any) {
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="gap-4 flex flex-wrap">
      {map(employees, (emp: any) => (
        <EmployeeCard
          name={emp.first_name}
          imageUrl={emp.avatar}
          onEdit={() => handleEdit(emp)}
          onDelete={() => handleDelete(emp)}
        />
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
