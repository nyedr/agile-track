"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { userSignupSchema, UserSignupData } from "@/types/forms";
import { toast } from "@/ui/toast";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [chosenProvider, setChosenProvider] = useState<
    "google" | "github" | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUserSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);

    event.preventDefault();

    try {
      if (chosenProvider) {
        await signIn(chosenProvider);
      } else {
        const data = new FormData(event.currentTarget);
        userSignupSchema.parse(data);

        const userSignup: UserSignupData = {
          first_name: data.get("first_name") as string,
          last_name: data.get("last_name") as string,
          email: data.get("email") as string,
          password: data.get("password") as string,
          password_confirmation: data.get("password_confirmation") as string,
        };

        const rawPostResponse = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userSignup),
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
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Pattern"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link className="block text-blue-600" href="/">
              <span className="sr-only">Home</span>
              <Image
                alt="Logo"
                src="https://i.postImage.cc/rm6Mj3gR/output.png"
                className="h-20"
              />
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Welcome to Agile Tracker
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Join for an organized interface for project management, task
              tracking, and team collaboration.
            </p>

            <form onSubmit={handleUserSignup}>
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
                    name="first_name"
                    className="mt-1 w-full"
                  />
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
                    name="last_name"
                    className="mt-1 w-full"
                  />
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
                    name="email"
                    className="mt-1 w-full"
                  />
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
                    name="password"
                    className="mt-1 w-full"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="password_confirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    {" "}
                    Password Confirmation{" "}
                  </label>

                  <Input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    className="mt-1 w-full"
                  />
                </div>
              </div>

              <div className="my-2">
                <label htmlFor="marketing_accept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="marketing_accept"
                    name="marketing_accept"
                    className="h-5 w-5 cursor-pointer rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                  />

                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    {" "}
                    I want to receive emails about events, issue and project
                    updates, and company announcements.{" "}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By creating an account, you agree to our
                  <LinkButton
                    href="/terms"
                    variant="color"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    {" "}
                    terms and conditions{" "}
                  </LinkButton>
                  and
                  <LinkButton
                    variant="color"
                    href="/privacy"
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
                    variant={"underline"}
                    className="text-gray-700 underline dark:text-gray-200"
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
                  variant="provider"
                >
                  <Image
                    alt="Google"
                    className="h-8 w-8"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/32px-Google_%22G%22_Logo.svg.png"
                  />
                </Button>
                <Button
                  isLoading={chosenProvider === "github" && isLoading}
                  onClick={() => setChosenProvider("github")}
                  variant="provider"
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

export default Signup;
