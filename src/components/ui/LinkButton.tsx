import { AnchorHTMLAttributes, FC } from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva("text-primary-text bg-transparent", {
  variants: {
    variant: {
      default:
        "hover:bg-slate-200 duration-300 dark:hover:bg-slate-600 no-underline rounded-md",
      underline:
        "font-semibold hover:underline underline-offset-2 decoration-slate-900 dark:decoration-slate-200 px-1",
      color: "text-sky-300 hover:text-sky-400 duration-300 font-medium",
      sidebarItem:
        "focus:shadow-outline mt-1 inline-flex w-full transform items-center rounded-lg px-4 py-2 text-sm transition duration-200 ease-in-out hover:bg-light-shade hover:text-semibold",
    },
    size: {
      sm: "text-sm",
      default: "text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface LinkButtonProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
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
    <Link className={cn(linkVariants({ className, size, variant }))} {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
