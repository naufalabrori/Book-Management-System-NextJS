/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getLoginData } from "@/lib/auth";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = getLoginData();
    setUserData(data);
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Placeholder
  }

  return <div>Welcome {userData.name}</div>;
};

export default Page;
