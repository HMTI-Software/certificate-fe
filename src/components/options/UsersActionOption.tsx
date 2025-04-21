"use client";

import {
  BookMarked,
  Mail,
  MoreHorizontal,
  Package,
  QrCode,
  Rocket,
  SquarePen,
  Tag,
  Trash2,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IParticipantDataTable } from "@/lib/types/Participants";
import GeneralAlert from "../popup/GeneralAlert";
import { useState } from "react";
import { IUsersDataTable } from "@/lib/types/User";
import { GeneralSheet } from "../sheet/GeneralSheet";
import { Badge } from "../ui/badge";
import { FormatDate } from "@/lib/functions";
import GeneralDialog from "../popup/GeneralDialog";

type UsersActionOptionProps = {
  data: IUsersDataTable;
};
export const UsersActionOption = ({ data }: UsersActionOptionProps) => {
  const [openDeactiveAlert, setOpenDeactiveAlert] = useState<boolean>(false);
  const [openActivateAlert, setOpenActivateAlert] = useState<boolean>(false);
  const [openShowUserSheet, setOpenShowUserSheet] = useState<boolean>(false);
  const [openUpgradeDialog, setOpenUpgradeDialog] = useState<boolean>(false);
  return (
    <>
      <div className="flex flex-row justify-center items-center space-x-2">
        <Button
          className={`bordered ${
            data.isPremium
              ? "bg-redd hover:bg-redd/90"
              : "bg-greenn hover:bg-greenn/90"
          }  text-black`}
          onClick={() => {
            if (data.isPremium) {
              setOpenDeactiveAlert(true);
            } else {
              setOpenActivateAlert(true);
            }
          }}
        >
          {data.isPremium ? "deactivate" : "activate"}
          <Tag />
        </Button>
        <Button
          className="bordered bg-purplee hover:bg-purplee/90 text-black"
          onClick={() => setOpenShowUserSheet(true)}
        >
          show <BookMarked />
        </Button>
      </div>
      <GeneralAlert
        open={openActivateAlert}
        setOpen={setOpenActivateAlert}
        title={"Activate Premium Feature"}
        message={
          "Are you sure you want to activate the premium feature for this user?"
        }
      />
      <GeneralAlert
        open={openDeactiveAlert}
        setOpen={setOpenDeactiveAlert}
        title={"Deactivate Premium Feature"}
        message={
          "Are you sure you want to deactivate the premium feature for this user?"
        }
      />
      <GeneralSheet
        open={openShowUserSheet}
        setOpen={setOpenShowUserSheet}
        title={"User Detail"}
        description={`Detail information about ${data.email}`}
      >
        <div className="px-4 flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <h5 className="text-sm font-semibold inline-flex">
              <Mail size={18} className="my-auto mr-2" /> Email :
            </h5>
            <p className="text-sm ml-[25px]">{data.fullEmail}</p>
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="text-sm font-semibold inline-flex">
              <UserCheck size={18} className="my-auto mr-2" /> Role :
            </h5>
            <Badge
              variant={"outline"}
              className={` ml-[25px] border-black ${
                data.role === "USER"
                  ? "bg-grayy text-black"
                  : "bg-redd text-black"
              }`}
            >
              {data.role === "USER" ? "user" : "super admin"}
            </Badge>
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="inline-flex text-sm font-semibold">
              <Tag size={18} className="my-auto mr-2" /> Premium :
            </h5>
            <div className="inline-flex">
              <Badge
                variant={"outline"}
                className={` ml-[25px] border-black ${
                  data.isPremium
                    ? "bg-yelloww text-black"
                    : "bg-[#7A7A7A] text-black"
                }`}
              >
                {data.isPremium ? "premium" : "not premium"}
              </Badge>
              <span
                className={`text-sm ml-2 ${data.isPremium ? "" : "hidden"}`}
              >
                - active since{" "}
                {FormatDate({
                  children: new Date(data.premiumAt as string).toISOString(),
                })}
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <h5 className="inline-flex text-sm font-semibold">
              <Package size={18} className="my-auto mr-2" /> Premium Package :
            </h5>
            <div className="inline-flex justify-between space-x-2 items-start">
              <Badge
                variant={"outline"}
                className={` ml-[25px] shrink-0 border-black ${
                  data.premiumPackage === "FREEPLAN"
                    ? "bg-[#D1D5DB]"
                    : data.premiumPackage === "SILVER"
                    ? "bg-[#C0C0C0]"
                    : data.premiumPackage === "PLATINUM"
                    ? "bg-[#E5E4E2]"
                    : "bg-[#FFD700]"
                }`}
              >
                {data.premiumPackage === "FREEPLAN"
                  ? "free plan"
                  : data.premiumPackage === "SILVER"
                  ? "silver plan"
                  : data.premiumPackage === "PLATINUM"
                  ? "platinum plan"
                  : "gold plan"}
              </Badge>
              <Button
                size={"sm"}
                className="border-black bordered bg-greenn hover:bg-greenn/90 text-black hover:border-b-1 border-b-3"
                onClick={() => {
                  setTimeout(() => {
                    setOpenUpgradeDialog(true);
                  }, 50);
                }}
              >
                upgrade <Rocket />
              </Button>
            </div>
          </div>
        </div>
      </GeneralSheet>
      <GeneralDialog
        open={openUpgradeDialog}
        setOpen={setOpenUpgradeDialog}
        title={"Upgrade Premium Package"}
        message={`Upgrade ${data.email} premium package`}
      ></GeneralDialog>
    </>
  );
};
