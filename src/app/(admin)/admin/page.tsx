import Navbar from "@/components/Navbar";
import { promises as fs } from "fs";
import path from "path";
export const metadata: Metadata = {
  title: "Admin Page",
  description: "Admin Page",
};

import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/PremiumTable";
import { Metadata } from "next";
export async function getPremiumUsers() {
  try {
    const res = await fs.readFile(
      path.join(process.cwd(), "public/static/premiumUsers.json"),
      "utf-8",
    );
    const data = JSON.parse(res.toString());
    return data;
  } catch (error) {
    console.error(error);
  }
}

const AdminPage = async () => {
  const premiumUsersData = await getPremiumUsers();
  return (
    <>
      <div className="w-full px-40 min-h-screen">
        <Navbar />
        <div className="container mx-auto py-10">
          <h1 className="text-lg font-bold">Profile</h1>
          <DataTable columns={columns} data={premiumUsersData} />
        </div>
      </div>
    </>
  );
};

export default AdminPage;
