export interface Location {
  name: string;
  href: string;
}

export interface PathVariants {
  projects: Location[] | null;
  issues: Location[] | null;
}
