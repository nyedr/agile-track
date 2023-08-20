import { cn } from "@/lib/utils";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import Button from "@/components/ui/Button";

interface Wrapper {
  children: ReactNode;
  className?: string;
}

export const DropdownMenu = ({ children }: Wrapper) => (
  <Menu as="div" className="relative ml-3">
    {children}
  </Menu>
);

export const DropdownMenuContent = ({ children, className }: Wrapper) => (
  <Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
  >
    <Menu.Items
      className={cn(
        className,
        "absolute shadow-primary-text right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-secondary-background py-1 shadow-sm focus:outline-none"
      )}
    >
      {children}
    </Menu.Items>
  </Transition>
);

export const DropdownMenuTrigger = ({ children, className }: Wrapper) => (
  <Menu.Button
    className={cn(
      className,
      "relative flex rounded-full bg-secondary-background text-sm focus:outline-none focus:ring-2 focus:ring-primary-text focus:ring-offset-2 focus:ring-offset-secondary-background"
    )}
  >
    <span className="absolute -inset-1.5" />
    <span className="sr-only">Open user menu</span>
    {children}
  </Menu.Button>
);

interface DropdownMenuItemProps extends Wrapper {
  href?: string;
  onClick?: () => void;
}

export const DropdownMenuItem = ({
  children,
  href = "#",
  onClick,
  className,
}: DropdownMenuItemProps) => (
  <Menu.Item>
    {({ active }) => (
      <Button
        variant="none"
        size="none"
        onClick={onClick}
        href={href}
        className={cn(
          active ? "bg-background" : "",
          "w-full items-center justify-start px-4 py-2 text-sm text-primary-text",
          className
        )}
      >
        {children}
      </Button>
    )}
  </Menu.Item>
);
