import EmployeeTabs from "@/components/EmployeeTabs";

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">Employee Management System</h1>
      <div className="flex  p-4">
        <EmployeeTabs />
      </div>
    </main>
  );
}
