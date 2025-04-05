import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddNewParticipantsButton = () => {
  return (
    <Button className="bordered rounded-md bg-purplee py-2 px-4 flex gap-2 hover:bg-purplee">
      <span className="hidden md:inline-flex text-black">
        add new participant
      </span>
      <Plus className="text-black" />
    </Button>
  );
};

export default AddNewParticipantsButton;
