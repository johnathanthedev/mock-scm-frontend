'use client'

import { BasicOperationInformation, OperationInformationContextType } from '@/types/global-state/operation-information.types';
import { createContext, useContext } from 'react';

const defaultOperationInformationContextValue: OperationInformationContextType = {
  basicInfo: {
    id: null,
    name: null,
    joined: null,
    status: null
  },
  setBasicInfo: (value: BasicOperationInformation) => null
}

const OperationInformationContext = createContext<OperationInformationContextType>(defaultOperationInformationContextValue);

export const useOperationInformation = () => useContext(OperationInformationContext);

export default OperationInformationContext;