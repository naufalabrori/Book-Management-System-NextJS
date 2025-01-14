"use client";
import { UserProfile } from "@/components/modules/Administrator/Profile/UserProfile";
import useMenuStore from "@/hooks/useMenuStore";
import { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { setMenu } = useMenuStore();

  useEffect(() => {
    setMenu("Profile");
  }, [setMenu]);
  return (
    <div className="bg-white p-4 rounded-md shadow-lg">
      <UserProfile id={Number(params.id)} />
    </div>
  )
}