"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { userRegisterSchema, UserRegisterData } from "@/types/forms";
import { toast } from "@/ui/toast";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const [chosenProvider, setChosenProvider] = useState<
    "google" | "github" | null | "credentials"
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<UserRegisterData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const handleUserRegister: SubmitHandler<UserRegisterData> = async (
    data: UserRegisterData
  ) => {
    setIsLoading(true);

    try {
      if (!chosenProvider) throw new Error("Invalid provider, try again.");

      if (chosenProvider !== "credentials") {
        await signIn(chosenProvider);

        toast({
          title: "Success",
          message: "You have been successfuly registered and logged in!",
          type: "success",
        });
      } else {
        if (!isValid) {
          trigger();
          throw new Error("Invalid form data, try again.");
        }

        const rawPostResponse = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const postResponse = await rawPostResponse.json();
        const isError = postResponse.hasOwnProperty("error");

        toast({
          title: isError ? "Error" : "Success",
          message: isError ? postResponse?.error : postResponse?.message,
          type: isError ? "error" : "success",
        });
      }
    } catch (error: any) {
      if (error.hasOwnProperty("message"))
        toast({
          title: "Error",
          message: error.message,
          type: "error",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 w-full">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="h-full w-full relative">
            <Image
              alt="Pattern"
              src="https://i.postimg.cc/gJW9DG8h/blue-Background-Pattern.webp"
              className="absolute inset-0 object-cover"
              fill={true}
              loading="lazy"
            />
          </div>
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link className="block text-blue-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                alt="Logo"
                src="https://i.postimg.cc/1Xk8SYrb/agile-Track-Logo.png"
                width={80}
                height={80}
              />
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Welcome to Agile Tracker
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Join for an organized interface for project management, task
              tracking, and team collaboration.
            </p>

            <form onSubmit={handleSubmit(handleUserRegister)}>
              <div className="mb-6 mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {" "}
                    First Name{" "}
                  </label>

                  <Input
                    type="text"
                    id="FirstName"
                    className="mt-1 w-full"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {" "}
                    Last Name{" "}
                  </label>

                  <Input
                    type="text"
                    id="LastName"
                    className="mt-1 w-full"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs italic">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {" "}
                    Email{" "}
                  </label>

                  <Input
                    type="email"
                    id="Email"
                    className="mt-1 w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs italic">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {" "}
                    Password{" "}
                  </label>

                  <Input
                    type="password"
                    id="password"
                    className="mt-1 w-full"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs italic">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="passwordConfirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {" "}
                    Password Confirmation{" "}
                  </label>

                  <Input
                    type="password"
                    id="passwordConfirmation"
                    className="mt-1 w-full"
                    {...register("passwordConfirmation")}
                  />
                  {errors.passwordConfirmation && (
                    <p className="text-red-500 text-xs italic">
                      {errors.passwordConfirmation.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="my-2">
                <label htmlFor="marketing_accept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="marketing_accept"
                    className="h-5 w-5 cursor-pointer rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                    {...register("notificationsAllowed")}
                  />

                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {" "}
                    I don{"'"}t want to receive emails about events, issue and
                    project updates, and company announcements.{" "}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By creating an account, you agree to our
                  <LinkButton
                    href="/terms"
                    variant="color"
                    size="sm"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    {" "}
                    terms and conditions{" "}
                  </LinkButton>
                  and
                  <LinkButton
                    variant="color"
                    href="/privacy"
                    size="sm"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    {" "}
                    privacy policy{" "}
                  </LinkButton>
                  .
                </p>
              </div>

              <div className="mb-6 sm:flex sm:items-center sm:gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="shrink-0 border transition hover:bg-transparent hover:text-blue-600 focus:outline-none active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  Create an account
                </Button>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  Already have an account?
                  <LinkButton
                    href="/login"
                    size="sm"
                    variant={"underline"}
                    className="text-gray-700 underline dark:text-gray-200 hover:text-gray-600 duration-300 dark:hover:text-gray-300"
                  >
                    Log in
                  </LinkButton>
                  .
                </p>
              </div>
              <div className="relative mt-4 mb-8">
                <span className="block h-px w-full bg-gray-300"></span>
                <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit bg-white dark:bg-gray-900 dark:text-white px-2 text-sm">
                  Or continue with
                </p>
              </div>
              <div className="mt-3 grid w-full grid-cols-2 items-center justify-center gap-x-3">
                <Button
                  isLoading={chosenProvider === "google" && isLoading}
                  onClick={() => setChosenProvider("google")}
                  className="h-12"
                  variant="provider"
                >
                  <Image
                    alt="Google"
                    width="24"
                    height="24"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/32px-Google_%22G%22_Logo.svg.png"
                  />
                </Button>
                <Button
                  isLoading={chosenProvider === "github" && isLoading}
                  onClick={() => setChosenProvider("github")}
                  variant="provider"
                  className="h-12"
                >
                  <svg
                    className="w-8 h-8"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
