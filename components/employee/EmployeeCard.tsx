import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "../ui/card"; // Replace with the actual path
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { first } from "lodash";

interface IProps {
  name: string;
  imageUrl: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EmployeeCard = ({ name, imageUrl, onEdit, onDelete }: IProps) => (
  <Card className="flex justify-between items-center p-2">
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={imageUrl} alt={name} />
        <AvatarFallback>{first(name)}</AvatarFallback>
      </Avatar>
      <CardTitle className="text-lg">{name}</CardTitle>
    </div>
    <div className="flex justify-between items-center gap-1">
      <Pencil
        onClick={onEdit}
        color="gray"
        height={15}
        className="cursor-pointer"
      />
      <Trash2
        onClick={onDelete}
        color="red"
        height={15}
        className="cursor-pointer"
      />
    </div>
  </Card>
);

export default EmployeeCard;
