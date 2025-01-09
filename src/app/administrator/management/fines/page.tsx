"use client";
import { FinesDataTable } from "@/components/modules/Administrator/Management/Fines/Table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

export default function Page() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Fines");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <FinesDataTable />
    </div>
  );
}
