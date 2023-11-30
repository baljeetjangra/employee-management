"use client";
import { cachedApiAgent } from "@/lib/apiAgent";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { map } from "lodash";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await cachedApiAgent.get("/employees");
        console.log("res");
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

  return (
    <div>
      {map(employees, (emp: any) => (
        <div>
          <EmployeeCard name={emp.employee_name} />
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
