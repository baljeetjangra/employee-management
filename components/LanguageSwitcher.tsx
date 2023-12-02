"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale } = useParams();
  const [selectedValue, setSelectedValue] = useState(locale);
  const { get } = useSearchParams();
  const tabValue = get("tab");

  return (
    <div>
      <select
        value={selectedValue}
        onChange={(event) => {
          const value = event.target.value;
          setSelectedValue(value);
          router.push(`/${value}?tab=${tabValue}`);
        }}
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
