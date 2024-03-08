import { ReactNode } from "react";

export interface AlertState {
  show: boolean;
  text: string;
  variant: 'Success' | 'Warning' | 'Danger' | '';
}

export interface AlertContextType {
  alert: AlertState;
  triggerAlert: (text: string, variant?: 'Success' | 'Warning' | 'Danger') => void;
}

export interface AlertProviderProps {
  children: ReactNode;
}
