"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { userRegisterSchema, UserRegisterData } from "@/lib/validations/auth";
import { toast } from "@/ui/toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInProviders } from "@/types/auth";
import ProvidersSignIn from "@/components/ProvidersSignIn";

const Register = () => {
  const [chosenProvider, setChosenProvider] = useState<SignInProviders | null>(
    null
  );
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
    try {
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
    } catch (error: any) {
      if (error.hasOwnProperty("message"))
        toast({
          title: "Error",
          message: error.message,
          type: "error",
        });
    }
  };

  return (
    <section className="bg-background w-full">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <div className="h-full w-full relative">
            <Image
              alt="Pattern"
              src="https://i.postimg.cc/90SQMd74/blue-Chekered-Pattern.webp"
              className="absolute inset-0 object-cover"
              fill={true}
              loading="lazy"
            />
          </div>
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <Link className="block text-primary-color-accent" href="/">
              <span className="sr-only">Home</span>
              <Image
                alt="Logo"
                src="https://i.postimg.cc/1Xk8SYrb/agile-Track-Logo.png"
                width={80}
                height={80}
              />
            </Link>

            <h1 className="mt-6 text-2xl font-bold text-primary-text sm:text-3xl md:text-4xl">
              Welcome to AgileTrack
            </h1>

            <p className="mt-4 leading-relaxed text-secondary-text">
              Join for an organized interface for project management, task
              tracking, and team collaboration.
            </p>

            <form onSubmit={handleSubmit(handleUserRegister)}>
              <div className="mb-6 mt-8 grid grid-cols-6 gap-6">
                <Input
                  type="text"
                  id="FirstName"
                  {...register("firstName")}
                  error={errors.firstName as { message: string }}
                  labelText="First Name"
                />

                <Input
                  type="text"
                  id="LastName"
                  {...register("lastName")}
                  labelText="Last Name"
                  error={errors.lastName as { message: string }}
                />

                <Input
                  type="email"
                  id="Email"
                  {...register("email")}
                  labelText="Email"
                  error={errors.email as { message: string }}
                  containerClass="col-span-6"
                />

                <Input
                  type="password"
                  id="password"
                  {...register("password")}
                  error={errors.password as { message: string }}
                  labelText="Password"
                  isPrivateable={true}
                />

                <Input
                  type="password"
                  id="passwordConfirmation"
                  {...register("passwordConfirmation")}
                  labelText="Confirm Password"
                  error={errors.passwordConfirmation as { message: string }}
                  isPrivateable={true}
                />
              </div>

              <div className="my-2">
                <label htmlFor="marketing_accept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="marketing_accept"
                    className="h-5 w-5 cursor-pointer rounded-md border-gray-200 bg-background shadow-sm dark:border-gray-700 dark:bg-secondary-background dark:focus:ring-offset-gray-900"
                    {...register("notificationsAllowed")}
                  />

                  <span className="text-sm text-secondary-text">
                    {" "}
                    I don{"'"}t want to receive emails about events, issue and
                    project updates, and company announcements.{" "}
                  </span>
                </label>
              </div>

              <div className="mb-4">
                <p className="text-sm text-secondary-text">
                  By creating an account, you agree to our
                  <LinkButton
                    href="/terms"
                    variant="color"
                    size="sm"
                    className="text-secondary-text underline"
                  >
                    {" "}
                    terms and conditions{" "}
                  </LinkButton>
                  and
                  <LinkButton
                    variant="color"
                    href="/privacy"
                    size="sm"
                    className="text-secondary-text underline"
                  >
                    {" "}
                    privacy policy{" "}
                  </LinkButton>
                  .
                </p>
              </div>

              <div className="mb-6 sm:flex sm:gap-4 items-center">
                <Button
                  size="lg"
                  onClick={() => setChosenProvider(SignInProviders.CREDENTIALS)}
                  type="submit"
                  className="bg-primary-color border border-primary-color text-white hover:bg-transparent hover:border-primary-color hover:text-primary-color-accent shrink-0 transition focus:outline-none"
                >
                  Create an account
                </Button>

                <p className="mt-4 text-sm text-secondary-text sm:mt-0">
                  Already have an account?
                  <LinkButton
                    href="/login"
                    size="sm"
                    variant="color"
                    className="text-secondary-text underline duration-300 ps-1"
                  >
                    Log in
                  </LinkButton>
                  .
                </p>
              </div>
              <ProvidersSignIn
                chosenProvider={chosenProvider}
                setChosenProvider={setChosenProvider}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Register;
