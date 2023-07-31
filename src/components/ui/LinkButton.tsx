import { AnchorHTMLAttributes, FC } from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva("text-slate-900 dark:text-slate-200 bg-transparent", {
  variants: {
    variant: {
      default:
        "hover:bg-slate-200 duration-300 dark:hover:bg-slate-600 no-underline rounded-md",
      underline:
        "font-semibold hover:underline underline-offset-2 decoration-slate-900 dark:decoration-slate-200",
      color: "text-sky-300 hover:text-sky-400 duration-300 font-medium",
    },
    size: {
      sm: "text-sm px-1",
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
