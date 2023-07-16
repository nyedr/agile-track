import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { BiLoaderAlt } from "react-icons/bi";
import { ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex duration-300 items-center font-medium",
  {
    variants: {
      variant: {
        default: "bg-sky-400 text-white hover:bg-sky-500 rounded-md",
        destructive: "text-white bg-red-600 hover:bg-red-500 rounded-md",
        outline:
          "bg-sky-200 text-white hover:bg-sky-300 border border-sky-400 rounded-md",
        subtle:
          "bg-sky-200 text-slate-900 hover:bg-sky-300 dark:text-white rounded-md",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
      },
      size: {
        default: "py-2 px-5 font-sm",
        sm: "h-9 px-2 rounded-md font-sm",
        lg: "h-11 px-8 rounded-md",
        full: "w-full h-10 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <BiLoaderAlt className="mr-2 h-4 w-4 animate-spin" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
