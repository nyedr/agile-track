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
          className="rounded-md outline-none p-2 hover:bg-light-shade text-secondary-text hover:text-primary-text"
        >
          <Icons.Sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 h-6 w-6" />
          <Icons.Moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 h-6 w-6" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("light")}
        >
          <Icons.Sun className="h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("dark")}
        >
          <Icons.Moon className="h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => setTheme("system")}
        >
          <Icons.Laptop className="h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
