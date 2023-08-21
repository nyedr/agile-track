import { AnchorHTMLAttributes, FC } from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const linkButtonVariants = cva("text-primary-text bg-transparent", {
  variants: {
    variant: {
      default:
        "hover:bg-slate-200 duration-300 dark:hover:bg-slate-600 no-underline rounded-md",
      underline:
        "underline underline-offset-[6px] decoration-[3px] decoration-primary-color px-1",
      color:
        "text-primary-text hover:text-primary-color-accent duration-300 font-medium",
      sidebarItem:
        "focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm transition duration-200 ease-in-out hover:bg-light-shade hover:text-semibold",
      none: "",
    },
    size: {
      sm: "text-sm",
      default: "text-base",
      padded: "px-4 py-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {
  href: string;
  replace?: boolean;
  prefetch?: boolean;
}

const LinkButton: FC<LinkButtonProps> = ({
  children,
  className,
  size,
  variant,
  ...props
}) => {
  return (
    <Link
      className={cn(linkButtonVariants({ className, size, variant }))}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
