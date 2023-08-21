"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import Button from "@/ui/Button";
import Icons from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/DropdownMenu";

export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="none"
          size="none"
          className="p-2 rounded-md outline-none hover:bg-light-shade text-secondary-text hover:text-primary-text"
        >
          <Icons.Sun className="w-6 h-6 transition-all scale-100 rotate-0 dark:-rotate-90 dark:scale-0" />
          <Icons.Moon className="absolute w-6 h-6 transition-all scale-0 rotate-90 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("light")}
        >
          <Icons.Sun className="w-4 h-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("dark")}
        >
          <Icons.Moon className="w-4 h-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("system")}
        >
          <Icons.Laptop className="w-4 h-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
