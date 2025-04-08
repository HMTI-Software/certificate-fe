import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

type Props = {};
export const DeleteEventButton = ({}: Props) => {
  return (
    <Button>
      Delete Event
      <Trash2 className="ml-2" size={16} />
    </Button>
  );
};
