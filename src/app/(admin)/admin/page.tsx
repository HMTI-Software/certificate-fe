import { auth } from "@/auth";
//COMPOMENTS
import { columns } from "@/components/table/columns/UsersColumn";
import { GeneralTable } from "@/components/table/table";
import { IUserResponse, IUsersData, IUsersDataTable } from "@/lib/types/User";

const getUsersData = async () => {
  try {
    const session = await auth();
    if (!session) {
      return {
        success: false,
        message: "Session not found",
      };
    }
    const token = session?.token;
    if (!token) {
      return {
        success: false,
        message: "Token not found",
      };
    }
    const res = await fetch(`${process.env.FRONTEND_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to fetch users data",
      };
    }
    const usersData: IUserResponse<IUsersData[]> = await res.json();
    if (!usersData.success) {
      return {
        success: false,
        message: usersData.message || "Failed to fetch users data",
      };
    }
    return {
      success: true,
      data: usersData.data,
    };
  } catch (error) {
    console.error("Error fetching users data:", error);
    return {
      success: false,
      message: "Error fetching users data",
    };
  }
};

const AdminPage = async () => {
  const session = await auth();
  if (!session) {
    return <div>Unauthorized</div>;
  }
  const token = session?.token;
  const usersData = await getUsersData();
  if (!usersData.success) {
    return <div>No users data available</div>;
  }

  const filteredUsersDataTable: IUsersDataTable[] = usersData?.data!.map(
    (value, index) => {
      return {
        id: index + 1,
        token: token,
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
        />
      </div>
    </>
  );
};

export default AdminPage;
