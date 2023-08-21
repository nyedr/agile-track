"use client";

import { IssueInput, issueSchema } from "@/lib/validations/issues";
import { toast } from "@/ui/toast";
import { Statuses, IssueType, Priority, Issue } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import Select from "@/ui/Select";

import Input from "@/ui/Input";
import { capitalize, catchErrors } from "@/lib/utils";
import UserSelect from "@/ui/UserSelect";
import { getServerSession } from "next-auth";
import { getUserById } from "@/lib/helpers/getUser";

const IssueCreationForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<IssueInput>({
    resolver: zodResolver(issueSchema),
  });

  const pathname = usePathname();
  const pathParts = pathname.split("/").filter(Boolean);
  const projectName = pathParts[0] === "projects" ? pathParts[1] : null;

  const handleIssueCreate: SubmitHandler<IssueInput> = async (
    data: IssueInput
  ) => {
    try {
      if (!isValid) {
        trigger();
        throw new Error("Invalid form data, try again.");
      }

      const session = await getServerSession();
      const username = session?.user?.name;
      const user = await getUserById(username as string);

      if (!user) catchErrors("User not found.");

      const IssueData: IssueInput = {
        ...data,
        reporterId: user.id,
      };

      const rawPostResponse = await fetch(`/api/${projectName}/issues/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(IssueData),
      });

      const postResponse = await rawPostResponse.json();
      const isError = postResponse.hasOwnProperty("error");

      toast({
        title: isError ? "Error" : "Success",
        message: isError ? postResponse?.error : postResponse?.message,
        type: isError ? "error" : "success",
      });
    } catch (error: any) {
      catchErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleIssueCreate)}>
      <Input
        labelText="Title"
        type="text"
        id="title"
        placeholder="Issue title"
        {...register("title")}
        error={errors.title as { message: string }}
      />

      <Input
        labelText="Description"
        type="text"
        id="description"
        placeholder="Issue description"
        {...register("description")}
        error={errors.description as { message: string }}
      />

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="type"
          className="block text-sm font-medium text-primary-text"
        >
          Issue type
        </label>
        <div className="relative w-full mt-2">
          <Select
            options={[
              capitalize(IssueType.BUG),
              capitalize(IssueType.FEATURE),
              capitalize(IssueType.TASK),
              capitalize(IssueType.EPIC),
              capitalize(IssueType.STORY),
            ]}
            {...register("type")}
          />
        </div>
        {errors.type?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.type?.message}</p>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="priority"
          className="block text-sm font-medium text-primary-text"
        >
          Priority
        </label>
        <div className="relative w-full mt-2">
          <Select
            options={[
              capitalize(Priority.LOW),
              capitalize(Priority.MEDIUM),
              capitalize(Priority.HIGH),
              capitalize(Priority.URGENT),
            ]}
            {...register("priority")}
          />
        </div>
        {errors.priority?.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.priority?.message}
          </p>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-primary-text"
        >
          Status
        </label>
        <div className="relative w-full mt-2">
          <Select
            options={[
              capitalize(Statuses.OPEN),
              capitalize(Statuses.IN_PROGRESS),
              capitalize(Statuses.COMPLETED),
              capitalize(Statuses.CLOSED),
            ]}
            {...register("status")}
          />
        </div>
        {errors.status?.message && (
          <p className="mt-1 text-sm text-red-500">{errors.status?.message}</p>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="assigneId"
          className="block text-sm font-medium text-primary-text"
        >
          Assigne
        </label>
        <div className="relative w-full mt-2">
          <UserSelect {...register("assigneeId")} />
        </div>
        {errors.assigneeId?.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.assigneeId?.message}
          </p>
        )}
      </div>
    </form>
  );
};

export default IssueCreationForm;
