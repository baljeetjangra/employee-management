import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
  CardContent,
} from "./ui/card"; // Replace with the actual path

const EmployeeCard = ({ name, onEdit, onDelete }: any) => (
  <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>

    <CardFooter>
      {/* Edit and Delete icons */}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </CardFooter>
  </Card>
);

export default EmployeeCard;
