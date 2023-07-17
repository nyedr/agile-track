import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import LargeHeading from "@/components/ui/LargeHeading";

const page = () => {
  return (
    <div className="max-w-xl flex min-h-full flex-1 flex-col rounded-lg justify-center px-6 py-10 bg-white shadow-md dark:bg-slate-800 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <LargeHeading size="sm">Create your account</LargeHeading>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
            >
              {" "}
              Email address{" "}
            </label>
            <Input
              id="username"
              name="username"
              type="text"
              className="mt-2 w-full"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
            >
              {" "}
              Email address{" "}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              className="mt-2 w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-100"
            >
              {" "}
              Password{" "}
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              className="mt-2 w-full"
            />
          </div>

          <div className="flex mt-4 flex-col gap-2">
            <Button size="full">Sign up</Button>
            <Button className="bg-black hover:bg-slate-900">
              Sign up with Github
            </Button>
            <Button className="bg-red-500 hover:bg-red-400">
              Sign up with Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
