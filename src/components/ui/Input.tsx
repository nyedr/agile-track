"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import Icons from "@/components/Icons";

export const inputVariants = cva(
  "block text-primary-text placeholder-slate-400 invalid:border-pink-500 invalid:text-pink-600 focus:outline-none focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:bg-slate-50 disabled:border-slate-200 disabled:text-slate-500 disabled:shadow-none sm:leading-6",
  {
    variants: {
      variant: {
        default:
          "rounded-md border-gray-200 bg-secondary-background px-4 py-2 shadow-sm outline-none duration-300 focus:ring-2 dark:border-gray-700 border text-sm ring-inset ring-slate-300 focus:border-primary-color focus:ring-primary-color",
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
    VariantProps<typeof inputVariants> {
  labelText?: string;
  isPrivateable?: boolean;
  error?: { message: string };
  containerClass?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputSize,
      labelText,
      error,
      containerClass,
      isPrivateable,
      variant,
      ...props
    },
    ref
  ) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(true);

    return (
      <div className={containerClass ?? "col-span-6 sm:col-span-3"}>
        {labelText && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-primary-text"
          >
            {labelText}
          </label>
        )}

        <div className="relative w-full mt-2">
          <input
            ref={ref}
            className={cn(
              inputVariants({ className, inputSize, variant }),
              "w-full"
            )}
            {...props}
            type={
              isPrivateable
                ? props.type === "password" && !isPrivate
                  ? "text"
                  : isPrivate
                  ? "password"
                  : props.type
                : props.type
            }
          />
          {isPrivateable && (
            <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-700"
              >
                <span className="sr-only">Hide</span>
                {isPrivate ? (
                  <Icons.EyeVisible
                    onClick={() => setIsPrivate((prev) => !prev)}
                    className="w-5 h-5"
                  />
                ) : (
                  <Icons.EyeInvisible
                    onClick={() => setIsPrivate((prev) => !prev)}
                    className="w-5 h-5"
                  />
                )}
              </button>
            </span>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
