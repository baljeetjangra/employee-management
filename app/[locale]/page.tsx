import EmployeeTabs from "@/components/EmployeeTabs";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-xl ">{t("employee_management_system")}</h1>
        <LanguageSwitcher />
      </div>
      <div className="flex  p-4">
        <EmployeeTabs />
      </div>
    </main>
  );
}
