import { ReactElement } from "react";

export interface Props {
  path: string;
  slug: string;
  name: string;
  icon: string;
  component: ReactElement;
  isMenu: boolean;
  index: number;
}
