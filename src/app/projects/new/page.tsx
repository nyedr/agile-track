"use client";

import { newProjectSchema, NewProject } from "@/lib/validations/projects";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import { Statuses, User } from "@prisma/client";
import Input, { inputVariants } from "@/components/ui/Input";
import { useState } from "react";
import Button from "@/components/ui/Button";
import { catchErrors } from "@/lib/utils";

const CreateProject = () => {
  const [projectManagers, setProjectManagers] = useState<User[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProject>({
    resolver: zodResolver(newProjectSchema),
  });

  const onSubmit: SubmitHandler<NewProject> = async (data) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast({
        message: `Project ${data.name} created successfully`,
        type: "success",
        title: "Success",
      });
    } catch (error: unknown) {
      catchErrors(error);
    }
  };

  return (
    <div className="h-full p-5">
      <h1 className="text-3xl text-slate-800 dark:text-slate-200 font-semibold">
        Create a new project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            labelText="Name"
            type="text"
            {...register("name")}
            error={errors?.name as { message: string }}
          />

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <textarea
              id="Description"
              className={inputVariants({ inputSize: "sm" })}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <select
              id="Status"
              className={inputVariants({ inputSize: "sm" })}
              {...register("status")}
            >
              <option value={Statuses.OPEN}>Open</option>
              <option value={Statuses.IN_PROGRESS}>In progress</option>
              <option value={Statuses.COMPLETED}>Completed</option>
              <option value={Statuses.CLOSED}>Closed</option>
            </select>
            {errors.description && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="ProjectManager"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <select
              id="ProjectManager"
              className={inputVariants({ inputSize: "sm" })}
              {...register("projectManagerId")}
            >
              {projectManagers &&
                projectManagers.map((manager: User, idx: number) => (
                  <option key={idx} value={manager.id}>
                    {manager.username}
                  </option>
                ))}
            </select>
            {errors.projectManagerId && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.projectManagerId.message}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" variant={"default"} size={"lg"}>
          Create project
        </Button>
      </form>
    </div>
  );
};

export default CreateProject;
