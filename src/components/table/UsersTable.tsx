import { IUsersData, IUsersDataTable } from "@/lib/types/User";
import { GeneralTable } from "./table";
import { columns } from "./columns/UsersColumn";
import { useMemo } from "react";

type Props = {
  usersData: IUsersData[];
  token: string;
};
export const UsersTable = ({ usersData, token }: Props) => {
  const usersDataTable = useMemo<IUsersDataTable[]>(
    () =>
      usersData.map((value, index) => {
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
      }),
    [usersData, token],
  );
  return (
    <div>
      <GeneralTable columns={columns} data={usersDataTable} page={"admin"} />
    </div>
  );
};
