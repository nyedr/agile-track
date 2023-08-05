"use client";

import Button from "@/ui/Button";
import { SignInProviders } from "@/types/auth";
import type { Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/toast";
import { getServerSession } from "next-auth/next";
import Icons from "@/components/Icons";

interface ProvidersSignInProps {
  chosenProvider: SignInProviders | null;
  setChosenProvider: Dispatch<SetStateAction<SignInProviders | null>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const ProvidersSignIn = ({
  chosenProvider,
  isLoading,
  setChosenProvider,
  setIsLoading,
}: ProvidersSignInProps) => {
  const signInProvider = async (provider: SignInProviders) => {
    setIsLoading(true);

    if (provider === SignInProviders.CREDENTIALS)
      throw new Error("Invalid Provider.");

    try {
      await signIn(provider);
    } catch (err: any) {
      if (err?.hasOwnProperty("message")) {
        toast({
          title: "Error",
          message:
            err?.message ??
            "Failed authentication, check with your provider and try again.",
          type: "error",
        });
      }
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
    <div>
      <div className="relative my-8">
        <span className="block h-px w-full bg-gray-300"></span>
        <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit bg-white dark:bg-gray-900 dark:text-white px-2 text-sm">
          Or continue with
        </p>
      </div>
      <div className="mt-3 grid w-full grid-cols-2 items-center justify-center gap-x-3">
        <Button
          isLoading={chosenProvider === SignInProviders.GOOGLE && isLoading}
          onClick={() => {
            setChosenProvider(SignInProviders.GOOGLE);
            signInProvider(SignInProviders.GOOGLE);
          }}
          className="h-12 flex items-center gap-3"
          variant="provider"
          type="button"
        >
          <Icons.GoogleIcon />
          <span>Google</span>
        </Button>
        <Button
          isLoading={chosenProvider === SignInProviders.GITHUB && isLoading}
          onClick={() => {
            setChosenProvider(SignInProviders.GITHUB);
            signInProvider(SignInProviders.GITHUB);
          }}
          variant="provider"
          className="h-12 flex items-center gap-3"
          type="button"
        >
          <Icons.GithubIcon />
          <span>Github</span>
        </Button>
      </div>
    </div>
  );
};

export default ProvidersSignIn;
