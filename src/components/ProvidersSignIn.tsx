import Button from "@/ui/Button";
import { SignInProviders } from "@/types/auth";
import type { Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/toast";
import { getServerSession } from "next-auth/next";
import Icons from "@/components/Icons";
import { catchErrors } from "@/lib/utils";

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
    } catch (error: unknown) {
      catchErrors(error);
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
      <div className="relative my-8 text-primary-text">
        <span className="block w-full h-px bg-gray-300"></span>
        <p className="absolute inset-x-0 inline-block px-2 mx-auto text-sm -top-2 w-fit bg-background">
          Or continue with
        </p>
      </div>
      <div className="grid items-center justify-center w-full grid-cols-2 mt-3 gap-x-3">
        <Button
          isLoading={chosenProvider === SignInProviders.GOOGLE && isLoading}
          onClick={() => {
            setChosenProvider(SignInProviders.GOOGLE);
            signInProvider(SignInProviders.GOOGLE);
          }}
          className="flex items-center h-12 gap-3"
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
          className="flex items-center h-12 gap-3"
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
