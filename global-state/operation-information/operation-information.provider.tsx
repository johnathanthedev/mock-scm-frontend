'use client'

import { BasicOperationInformation, OperationInformationProviderProps } from '@/types/global-state/operation-information.types';
import React, { useState } from 'react';
import OperationInformationContext from './operation-information.context';

export const OperationInformationProvider: React.FC<OperationInformationProviderProps> = ({ children }) => {
  const [basicInfo, setBasicInfo] = useState<BasicOperationInformation>({
    id: null,
    name: null,
    joined: null,
    status: null
  });

  return (
    <OperationInformationContext.Provider
      value={{
        basicInfo,
        setBasicInfo
      }}
    >
      {children}
    </OperationInformationContext.Provider>
  );
};
