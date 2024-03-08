import { ComponentSize } from "@/types/components/generic.types";

export interface Props {
  text: string;
  fluid?: boolean;
  size: ComponentSize;
  onClick?: () => void;
  className?: string;
  variant: ButtonVariant;
}

export type ButtonVariant = "Primary" | "Dark";