import { create } from "zustand";

type EmployeeStore = {
  employeeDetails: Employee;
  editEmployee: (data: Employee) => void;
};

export const useEmployeeStore = create<EmployeeStore>((set) => ({
  employeeDetails: {
    first_name: "",
    age: 0,
    salary: 0,
    profile_image: "",
    avatar:"",
    email:"",
    last_name:""
  },
  editEmployee: (data: Employee) => set((state) => ({ employeeDetails: data })),
}));
