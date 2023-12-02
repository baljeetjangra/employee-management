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
import { useToast } from "../ui/use-toast";
import { ClipLoader } from "react-spinners";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  first_name: z.string().min(2).max(50),
  salary: z.number().int().positive(),
  age: z.number().int().positive().min(18).max(99),
  profile_image: z
    .any()
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    )
    .optional(),
});

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

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "profile_image") {
          const files = values[key] as any;
          if (files.length > 0) {
            formData.append(key, files[0]);
          }
        } else {
          if (key in values && values[key as keyof Employee] !== undefined) {
            formData.append(key, JSON.stringify(values[key as keyof Employee]));
          }
        }
      });

      toast({
        description: `User ${editMode ? "updated" : "created"} successfully!`,
      });

      if (!editMode) {
        form.reset();
      }
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
                    min={0}
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
                    min={0}
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
                          const files = event.target.files;
                          setPreview(
                            URL.createObjectURL(event.target.files![0])
                          );
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
