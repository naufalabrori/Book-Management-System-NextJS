"use client";
import { BookDataTable } from "@/components/modules/Administrator/MasterData/Book/Table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

export default function Page() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Book");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <BookDataTable />
    </div>
  );
}
