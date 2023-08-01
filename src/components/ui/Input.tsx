"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef, useState } from "react";
import Icons from "@/components/Icons";

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
    VariantProps<typeof inputVariants> {
      labelText?: string
      isPrivateable?: boolean
      error?: { message: string }
      containerClass?: string
    }

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, labelText, error, containerClass, isPrivateable, variant, ...props }, ref) => {
    const [isPrivate, setIsPrivate] = useState<boolean>(true);

    return (
      <div className={containerClass ?? "col-span-6 sm:col-span-3"}>
        {labelText && 
          (
            <label
              htmlFor={props.id}
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              {labelText}
            </label>
          )
        }

        <div className="relative mt-2 w-full">
          <input
            ref={ref}
            className={cn(inputVariants({ className, inputSize, variant }), "w-full")}
            {...props}
            type={isPrivateable ? (props.type === "password" && !isPrivate ? "text" : isPrivate ? "password" : props.type) : props.type}
          />
          {
          isPrivateable && 
          (
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button type="button" className="text-gray-600 hover:text-gray-700">
                <span className="sr-only">Hide</span>
                {isPrivate ? 
                    (
                      <Icons.EyeInvisible onClick={() => setIsPrivate(prev => !prev)} className="h-5 w-5" />
                    ) :
                    (
                      <Icons.EyeVisible onClick={() => setIsPrivate(prev => !prev)} className="h-5 w-5" />
                    )
                  }
              </button>
            </span>
          )
        }
      </div>

      {error && (
        <p className="text-red-500 mt-1 text-sm">
          {error.message}
        </p>
      )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
