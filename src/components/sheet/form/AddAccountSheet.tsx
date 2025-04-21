import { useForm } from "react-hook-form";
import { GeneralSheet } from "../GeneralSheet";
import { z } from "zod";
import { addAccountFormSchema } from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/forms/fields/CustomInputField";
import { Button } from "@/components/ui/button";
import { SelectFormField } from "@/components/forms/fields/CustomSelectField";
import { useState } from "react";
import { toast } from "sonner";
import { signUpByAdmin } from "@/actions/mutation/auth/signUpByAdmin";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  token: string;
};
export const AddAccountSheet = ({ open, setOpen, token }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const addAccountForm = useForm<z.infer<typeof addAccountFormSchema>>({
    resolver: zodResolver(addAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      roles: "USER",
      packagePremium: "FREEPLAN",
    },
  });
  const handleSubmit = async (values: z.infer<typeof addAccountFormSchema>) => {
    setIsLoading(true);
    setOpen(false);
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Password and confirm password must be same");
        setIsLoading(false);
        addAccountForm.reset();
        return;
      }
      toast.promise(signUpByAdmin(values, token), {
        loading: "Creating account...",
        success: (data) => {
          if (data.success) {
            return data.message;
          }
          throw new Error(data.message as string);
        },
        error: (error) => {
          console.error("ERROR IN ADD ACCOUNT : ", error);
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
          addAccountForm.reset();
        },
      });
    } catch (error) {
      console.error("ERROR IN ADD ACCOUNT : ", error);
      toast.error("An unknown error occurred");
    } finally {
      setIsLoading(false);
      addAccountForm.reset();
    }
  };
  return (
    <GeneralSheet
      open={open}
      setOpen={setOpen}
      title="add account"
      description="Create new account for user"
    >
      <Form {...addAccountForm}>
        <form
          onSubmit={addAccountForm.handleSubmit(handleSubmit)}
          className="px-4 flex flex-col space-y-4"
        >
          <InputFormField
            form={addAccountForm}
            name="email"
            label="Email :"
            placeholder="user@gmail.com"
            type="email"
            description="email must be valid email address"
          />
          <InputFormField
            form={addAccountForm}
            name="password"
            label="Password :"
            placeholder="********"
            type="password"
            description="Password must be at least 8 characters long"
          />
          <InputFormField
            form={addAccountForm}
            name="confirmPassword"
            label="Confirm Password :"
            placeholder="********"
            type="password"
            description="Password must same as above"
          />
          <div className="flex flex-row space-x-4">
            <SelectFormField
              form={addAccountForm}
              name="roles"
              label="Roles :"
              description="Select roles for this account"
              options={[
                { value: "USER", label: "User" },
                { value: "SUPERADMIN", label: "Super Admin" },
              ]}
              placeholder="Select roles"
            />
            <SelectFormField
              form={addAccountForm}
              name="packagePremium"
              label="Premium Package :"
              description="Select premium package "
              options={[
                { value: "FREEPLAN", label: "Free Plan" },
                { value: "SILVER", label: "Silver" },
                { value: "PLATINUM", label: "Platinum" },
                { value: "GOLD", label: "Gold" },
              ]}
              placeholder="Select premium package"
            />
          </div>

          <Button
            type="submit"
            size={"lg"}
            className="bordered bg-greenn hover:bg-greenn/90 hover:border-b-1 border-b-4 text-black"
          >
            add account
          </Button>
        </form>
      </Form>
    </GeneralSheet>
  );
};
