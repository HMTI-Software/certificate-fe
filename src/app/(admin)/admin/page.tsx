"use client";

import Navbar from "@/components/Navbar";
// export const metadata: Metadata = {
//   title: "Admin Page",
//   description: "Admin Page",
// };

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/premium-table";
import { IPremiumUsers } from "@/lib/Interface";
import { Metadata } from "next";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const [premiumUsersData, setPremiumUsersData] = useState<IPremiumUsers[]>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [isPremium, setIsPremium] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/static/PremiumUsers.json");
        const res = await data.json();
        setPremiumUsersData(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFetched(true);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="w-full px-40 min-h-screen">
        <Navbar />
        <div className="container mx-auto py-10">
          <h1 className="text-lg font-bold">Profile</h1>
          <DataTable
            columns={columns}
            data={premiumUsersData ? premiumUsersData : []}
          />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
