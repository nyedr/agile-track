import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "rounded-md block px-3 py-2 text-sm text-slate-900 placeholder-slate-400 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none duration-300 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none sm:leading-6",
  {
    variants: {
      variant: {
        default:
          "border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:ring-1 ring-inset ring-slate-300 focus:border-sky-500 focus:ring-sky-500",
        ghost: "border-none",
      },
      // size: {
      //   sm: "text-sm px-3 py-2",
      //   default: "text-base",
      // },
    },
    defaultVariants: {
      variant: "default",
      // size: "default",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ className, variant }))}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
