"use client";
import { CreateTransactionForm } from "@/components/modules/Administrator/Management/Transaction/CreateForm";
import { TransactionDataTable } from "@/components/modules/Administrator/Management/Transaction/Table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

export default function Page() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Transaction");
  }, [setMenu]);

  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateTransactionForm/>
      <TransactionDataTable />
    </div>
  );
}
