import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

const inputVariants = cva(
  "block text-slate-900 placeholder-slate-400 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none sm:leading-6",
  {
    variants: {
      variant: {
        default:
          "rounded-md border-gray-200 bg-white px-4 py-2 shadow-sm outline-none duration-300 focus:ring-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 border text-sm ring-inset ring-slate-300 focus:border-blue-500 focus:ring-blue-500",
        ghost: "border-none focus:bg-slate-200 dark:focus:bg-gray-700",
      },
      inputSize: {
        sm: "text-sm px-3 py-2",
        default: "text-sm x-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  }
);

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, variant, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputVariants({ className, inputSize, variant }))}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
