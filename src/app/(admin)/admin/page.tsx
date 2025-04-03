import { promises as fs } from "fs";
import path from "path";
import { auth } from "@/auth";
//COMPOMENTS
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/PremiumTable";

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
  const session = await auth();
  const premiumUsersData = await getPremiumUsers();
  console.log(session);

  return (
    <>
      <div className=" mx-auto py-10">
        <h1 className="text-lg font-bold">Profile</h1>
        <DataTable columns={columns} data={premiumUsersData} />
      </div>
    </>
  );
};

export default AdminPage;
