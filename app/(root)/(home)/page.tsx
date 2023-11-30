import EmployeeList from "@/components/EmployeeList";
import EmployeeForm from "@/components/forms/EmployeeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Employee Management System</h1>
      <div className="flex justify-center p-4">
        <Tabs defaultValue="add-employee" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="add-employee" className="gap-2">
              Add Employee
            </TabsTrigger>
            <TabsTrigger value="edit-employee">Edit Employee</TabsTrigger>
            <TabsTrigger value="view-employees">View Employees</TabsTrigger>
          </TabsList>
          <TabsContent value="add-employee">
            <EmployeeForm />
          </TabsContent>
          <TabsContent value="edit-employee">
            Change your password here.
          </TabsContent>
          <TabsContent value="view-employees">
            <EmployeeList />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
