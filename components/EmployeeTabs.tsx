"use client";
import React from "react";
import EmployeeList from "@/components/employee/EmployeeList";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEmployeeStore } from "@/store/zustand";

const EmployeeTabs = () => {
  const { get } = useSearchParams();
  const selectedTab = get("tab");
  const editEmpDetails = useEmployeeStore((state) => state.employeeDetails);

  return (
    <Tabs defaultValue={selectedTab || "add-employee"}>
      <TabsList>
        <TabsTrigger value="add-employee" className="gap-2">
          <Link href={"/?tab=add-employee"}>Add Employee</Link>
        </TabsTrigger>
        <TabsTrigger value="edit-employee">
          <Link href={"/?tab=edit-employee"}>Edit Employee</Link>
        </TabsTrigger>
        <TabsTrigger value="view-employees">
          <Link href={"/?tab=view-employees"}>View Employees</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="add-employee">
        <EmployeeForm editMode={false} />
      </TabsContent>
      <TabsContent value="edit-employee">
        <EmployeeForm editMode={true} employeeData={editEmpDetails} />
      </TabsContent>
      <TabsContent value="view-employees">
        <EmployeeList />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeTabs;
