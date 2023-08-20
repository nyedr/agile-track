import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { BiLoaderAlt } from "react-icons/bi";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { redirect } from "next/navigation";

export const buttonVariants = cva("inline-flex duration-300 outline-none", {
  variants: {
    variant: {
      default:
        "items-center font-medium justify-center border-primary-color-accent bg-primary-color-accent focus:ring-2 text-white shadow-sm hover:bg-blue-500 rounded-md",
      destructive:
        "items-center font-medium justify-center text-white bg-red-600 hover:bg-red-500 rounded-md",
      outline:
        "items-center font-medium justify-center bg-blue-200 text-white hover:bg-blue-300 border border-sky-400 rounded-md",
      subtle:
        "items-center font-medium justify-center bg-blue-200 text-slate-900 hover:bg-blue-300 dark:text-white rounded-md",
      ghost:
        "items-center font-medium justify-centerbg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
      provider:
        "font-medium flex text-primary-text items-center justify-center rounded-lg border dark:border-slate-400 py-2.5 duration-150 hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:bg-gray-800",
      header:
        "rounded-lg text-gray-600 dark:text-primary-text-dark block shrink-0 bg-white shadow-sm dark:bg-slate-700 dark:text-slate-50 hover:bg-gray-50 dark:hover:bg-slate-700",
      none: "",
    },
    size: {
      default: "py-2 px-4 font-sm",
      sm: "h-9 px-2 font-sm",
      lg: "py-3 px-12",
      full: "w-full h-10",
      header: "p-2.5",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, isLoading, href, ...props }, ref) => {
    return (
      <button
        onClick={(e) => {
          props.onClick?.(e);
          if (href) {
            redirect(href);
          }
        }}
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
