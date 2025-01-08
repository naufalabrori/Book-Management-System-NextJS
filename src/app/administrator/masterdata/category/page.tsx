"use client";
import { CategoryDataTable } from "@/components/modules/Administrator/MasterData/Category/Table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

export default function Page() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Category");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CategoryDataTable />
    </div>
  );
};
