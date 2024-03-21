import { ReactNode } from "react";


export interface BasicOperationInformation {
  id: null | string;
  name: null | string;
  joined: null | boolean;
  status: null | string;
}

export interface OperationInformationContextType {
  basicInfo: BasicOperationInformation;
  setBasicInfo: (value: BasicOperationInformation) => void;
}

export interface OperationInformationProviderProps {
  children: ReactNode;
}
