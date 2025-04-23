"use client";

import {
  BookMarked,
  Mail,
  MoreVertical,
  Package,
  Rocket,
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
import GeneralAlert from "../popup/GeneralAlert";
import { useState } from "react";
import { IUsersDataTable } from "@/lib/types/User";
import { GeneralSheet } from "../sheet/GeneralSheet";
import { Badge } from "../ui/badge";
import { FormatDate } from "@/lib/functions";
import GeneralDialog from "../popup/GeneralDialog";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updownPackageFormSchema } from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectFormField } from "../forms/fields/CustomSelectField";
import { Form } from "../ui/form";
import { toast } from "sonner";
import { updownUserPackage } from "@/actions/mutation/users/updownUserPackage";

type UsersActionOptionProps = {
  data: IUsersDataTable;
};
export const UsersActionOption = ({ data }: UsersActionOptionProps) => {
  const [openDeactiveAlert, setOpenDeactiveAlert] = useState<boolean>(false);
  const [openActivateAlert, setOpenActivateAlert] = useState<boolean>(false);
  const [openShowUserSheet, setOpenShowUserSheet] = useState<boolean>(false);
  const [openUpdownDialog, setOpenUpdownDialog] = useState<boolean>(false);

  const updownForm = useForm<z.infer<typeof updownPackageFormSchema>>({
    resolver: zodResolver(updownPackageFormSchema),
  });

  const updownPackageHandler = async (
    values: z.infer<typeof updownPackageFormSchema>,
  ) => {
    setOpenUpdownDialog(false);
    if (openShowUserSheet) setOpenShowUserSheet(false);
    try {
      toast.promise(updownUserPackage(values, data.uid), {
        loading: "upgrading or downgrading package...",
        success: (data) => {
          if (data.success) {
            updownForm.reset();
            return data.message;
          }
          throw new Error(data.message);
        },
        error: (error) => {
          updownForm.reset();
          return error.message;
        },
        finally: () => {
          setOpenUpdownDialog(false);
          setOpenShowUserSheet(false);
        },
      });
    } catch (error) {
      console.error("ERROR IN UPDOWN PACKAGE HANDLER : ", error);
      toast.error("An unknown error occurred while upgrading the package.");
    }
  };
  const updownPackageOptions = [
    { value: "FREEPLAN", label: "free plan" },
    { value: "SILVER", label: "silver plan" },
    { value: "PLATINUM", label: "platinum plan" },
    { value: "GOLD", label: "gold plan" },
  ];
  const filteredUpdownPackageOptions = updownPackageOptions.filter(
    (option) => option.value !== data.premiumPackage,
  );

  return (
    <>
      <div className="flex flex-row justify-center items-center">
        <Button
          className="bordered bg-yelloww hover:bg-yelloww/90 text-black rounded-r-none"
          onClick={() => setOpenShowUserSheet(true)}
        >
          show <BookMarked />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bordered bg-purplee hover:bg-purplee/90 text-black rounded-l-none">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="border-b-4 border-black hover:border-b-1 bordered"
          >
            <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="text-sm"
                onClick={() => {
                  setTimeout(() => {
                    setOpenUpdownDialog(true);
                  }, 50);
                }}
              >
                <Rocket /> Upgrade
              </DropdownMenuItem>
              <DropdownMenuItem className="text-sm">
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <GeneralDialog
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
                    setOpenUpdownDialog(true);
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
        open={openUpdownDialog}
        setOpen={setOpenUpdownDialog}
        title={"Upgrade / Downgrade Premium Package"}
        message={`Upgrade or Downgrade ${data.email} premium package`}
        onSuccess={() => {
          updownForm.handleSubmit(updownPackageHandler)();
        }}
        onCancel={() => {
          updownForm.reset();
          setOpenUpdownDialog(false);
        }}
        autoClose={false}
      >
        <Form {...updownForm}>
          <form>
            <SelectFormField
              form={updownForm}
              name={"premiumPackage"}
              label={"Premium Package"}
              placeholder={"Select premium package"}
              options={filteredUpdownPackageOptions}
              description="Select the premium package you want to upgrade or downgrade to."
            />
          </form>
        </Form>
      </GeneralDialog>
    </>
  );
};
