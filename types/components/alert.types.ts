export interface AlertProps {
  text: string;
  variant: AlertVariant;
}

export type AlertVariant = "Warning" | "Success" | "Danger";