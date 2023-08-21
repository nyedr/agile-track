"use client";

import { Disclosure } from "@headlessui/react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/DropdownMenu";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Icons from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

interface HeaderProps {
  userImage?: string;
}

export default function Header({ userImage }: HeaderProps) {
  return (
    <Disclosure as="nav" className="z-20 border-b bg-secondary-background">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Icons.Close className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Icons.Menu className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                <Link href="/" className="flex items-center flex-shrink-0">
                  <Image
                    height={40}
                    width={40}
                    src="https://i.postimg.cc/1Xk8SYrb/agile-Track-Logo.png"
                    alt="Your Company"
                  />
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          item.current
                            ? "underline underline-offset-[6px] decoration-[3px] decoration-primary-color"
                            : "text-secondary-text duration-300 hover:bg-light-shade hover:text-primary-text",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ThemeToggle />
                <button
                  type="button"
                  className="relative p-1 rounded-full bg-secondary-background text-secondary-text hover:text-primary-text focus:outline-none focus:ring-2 focus:ring-primary-text focus:ring-offset-2 focus:ring-offset-secondary-background"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <Icons.Bell className="w-6 h-6" aria-hidden="true" />
                </button>
                {/* Profile dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Image
                      className="w-8 h-8 rounded-full"
                      height={32}
                      width={32}
                      src={
                        userImage ??
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt="User Avatar"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem href="/profile">
                      Your Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem href="/settings">
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={cn(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
