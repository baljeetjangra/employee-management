"use client";
import React, { useEffect, useState } from "react";
import EmployeeList from "@/components/employee/EmployeeList";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEmployeeStore } from "@/store/zustand";

type TabValue = "add" | "edit" | "view";

const EmployeeTabs = () => {
  const { get } = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<TabValue>("add");
  const tabValue = get("tab");
  const editEmpDetails = useEmployeeStore((state) => state.employeeDetails);

  useEffect(() => {
    setSelectedTab(tabValue as TabValue);
  }, [tabValue]);

  return (
    <Tabs
      defaultValue={selectedTab}
      value={selectedTab}
      orientation="horizontal"
      onValueChange={(value: string) => setSelectedTab(value as TabValue)}
    >
      <TabsList>
        <TabsTrigger value="add" className="gap-2">
          <Link href={"/?tab=add"}>Add Employee</Link>
        </TabsTrigger>
        <TabsTrigger value="edit">
          <Link href={"/?tab=edit"}>Edit Employee</Link>
        </TabsTrigger>
        <TabsTrigger value="view">
          <Link href={"/?tab=view"}>View Employees</Link>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <EmployeeForm editMode={false} />
      </TabsContent>
      <TabsContent value="edit">
        <EmployeeForm editMode={true} employeeData={editEmpDetails} />
      </TabsContent>
      <TabsContent value="view">
        <EmployeeList />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeTabs;
