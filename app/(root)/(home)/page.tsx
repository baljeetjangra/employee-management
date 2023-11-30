import EmployeeForm from "@/components/forms/EmployeeForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="flex justify-center p-12">
      <div className="">
        <h1 className="text-2xl mb-4">Employee Management System</h1>
        <Tabs defaultValue="add-employee" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="add-employee">Add Employee</TabsTrigger>
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
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
