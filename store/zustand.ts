import { create } from "zustand";

type EmployeeStore = {
  employeeDetails: Employee;
  editEmployee: (data: Employee) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employeeDetails: {
    employee_name: "",
    employee_age: 0,
    employee_salary: 0,
    profile_image: "",
  },
  editEmployee: (data: Employee) => set((state) => ({ employeeDetails: data })),
}));
