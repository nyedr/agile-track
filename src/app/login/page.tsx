"use client";

import { UserLoginData, userLoginSchema } from "@/types/forms";
import { toast } from "@/ui/toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInProviders } from "@/types/auth";
import ProvidersSignIn from "@/components/ProvidersSignIn";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LinkButton from "@/components/ui/LinkButton";

const Login = () => {
  const [chosenProvider, setChosenProvider] = useState<SignInProviders | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<UserLoginData>({
    resolver: zodResolver(userLoginSchema),
  });

  const signInWithCredentials = async (data: UserLoginData) => {
    setIsLoading(true);

    try {
      if (!isValid) {
        trigger();
        throw new Error("Invalid form data, try again.");
      }

      const { email, password } = data;

      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
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

    const session = await getServerSession();
    if (session) {
      toast({
        title: "Success",
        message: "You have been successfuly registered and logged in!",
        type: "success",
      });
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 w-full">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="Pattern"
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
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

            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-2xl md:text-3xl">
              Welcome back to AgileTrack
            </h1>

            <form onSubmit={handleSubmit(signInWithCredentials)}>
              <div className="mb-6 mt-8 grid grid-cols-6 gap-6">
                <Input
                  type="email"
                  id="Email"
                  {...register("email")}
                  containerClass="col-span-6"
                  error={errors.email as { message: string }}
                  labelText="Email"
                />

                <Input
                  type="password"
                  id="Password"
                  {...register("password")}
                  containerClass="col-span-6"
                  error={errors.password as { message: string }}
                  labelText="Password"
                  isPrivateable={true}
                />
              </div>

              <div className="mb-6 flex flex-col sm:gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => setChosenProvider(SignInProviders.CREDENTIALS)}
                  type="submit"
                  className="shrink-0 border transition hover:bg-transparent hover:text-blue-600 focus:outline-none active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white"
                >
                  Log in
                </Button>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                  Don{"'"}t have an account?
                  <LinkButton
                    href="/register"
                    size="sm"
                    variant={"underline"}
                    className="text-gray-700 underline dark:text-gray-200 hover:text-gray-600 duration-300 dark:hover:text-gray-300"
                  >
                    Register
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

export default Login;
