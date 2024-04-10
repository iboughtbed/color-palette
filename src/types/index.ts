import { type Icons } from "~/components/icons";

export type NavItems = {
  title: string;
  href: string;
  icon: keyof typeof Icons;
}[];
