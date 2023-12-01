"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { axiosInstance } from "@/lib/apiAgent";
import { useToast } from "../ui/use-toast";
import { ClipLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(2).max(50),
  salary: z.number().int().positive(),
  age: z.number().int().positive().min(18).max(99),
  profile_image: z.string().url().optional(),
});

function getImageData(event: React.ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}

interface IProps {
  editMode: boolean;
  employeeData?: Employee;
}

const EmployeeForm = ({ editMode, employeeData }: IProps) => {
  const [preview, setPreview] = useState("");
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Employee>({
    defaultValues: {
      first_name: "",
      age: 0,
      salary: 0,
    },
    values: employeeData,
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: Employee) {
    try {
      setIsLoading(true);
      await axiosInstance.post("/users", values);
      toast({
        description: "User created successfully!",
      });
      form.reset();
    } catch (error: any) {
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salary"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Salary</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Salary"
                    {...rest}
                    type="number"
                    onChange={(event) => {
                      onChange(parseInt(event.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Age"
                    {...rest}
                    type="number"
                    onChange={(event) => {
                      onChange(parseInt(event.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {editMode && (
          <div className="flex space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={preview} />
              <AvatarFallback>BU</AvatarFallback>
            </Avatar>
            <FormField
              control={form.control}
              name="profile_image"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormLabel>Profile Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...rest}
                        onChange={(event) => {
                          const { files, displayUrl } = getImageData(event);
                          setPreview(displayUrl);
                          onChange(files);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader size={20} color="white" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default EmployeeForm;
