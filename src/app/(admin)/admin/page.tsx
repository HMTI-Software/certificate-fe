import { promises as fs } from "fs";
import path from "path";
import { auth } from "@/auth";
//COMPOMENTS
import { columns } from "@/components/table/columns/UsersColumn";
import { GeneralTable } from "@/components/table/table";
import { IUserResponse, IUsersData, IUsersDataTable } from "@/lib/types/User";

const getUsersData = async (token: string) => {
  try {
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/users?token=${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (!res.ok) {
      throw new Error("Failed to fetch users data");
    }
    const usersData: IUserResponse<IUsersData[]> = await res.json();
    if (!usersData.success) {
      throw new Error(usersData.message || "Failed to fetch users data");
    }
    return usersData.data;
  } catch (error) {
    console.error("Error fetching users data:", error);
    throw new Error("Failed to fetch users data");
  }
};

const AdminPage = async () => {
  const session = await auth();
  if (!session) {
    return <div>Unauthorized</div>;
  }
  const token = session?.token;
  const usersData = await getUsersData(token);
  if (!usersData) {
    return <div>No users data available</div>;
  }

  const filteredUsersDataTable: IUsersDataTable[] = usersData.map(
    (value, index) => {
      return {
        id: index + 1,
        uid: value.uid,
        email: value.email.split("@")[0],
        fullEmail: value.email,
        isPremium: value.isPremium,
        premiumAt: value.premiumAt,
        premiumPackage: value.premiumPackage,
        role: value.role,
      };
    },
  );
  return (
    <>
      <div className=" mx-auto py-10">
        <h1 className="text-lg font-bold">Profile</h1>
        <GeneralTable
          columns={columns}
          data={filteredUsersDataTable}
          page={"admin"}
          token={token}
        />
      </div>
    </>
  );
};

export default AdminPage;
