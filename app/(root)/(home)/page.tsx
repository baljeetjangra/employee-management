import EmployeeTabs from "@/components/EmployeeTabs";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  return (
    <main className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl ">Employee Management System</h1>
        <LanguageSwitcher />
      </div>
      <div className="flex  p-4">
        <EmployeeTabs />
      </div>
    </main>
  );
}
