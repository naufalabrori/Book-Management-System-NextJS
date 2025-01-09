"use client";
import { CreateUserForm } from "@/components/modules/Administrator/MasterData/User/CreateForm";
import { UserDataTable } from "@/components/modules/Administrator/MasterData/User/Table";
import useMenuStore from "@/hooks/useMenuStore";
import React, { useEffect } from "react";

export default function Page() {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("User");
  }, [setMenu]);
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <CreateUserForm data={null} />
      <UserDataTable />
    </div>
  );
}
