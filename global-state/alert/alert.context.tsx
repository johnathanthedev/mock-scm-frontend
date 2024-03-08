'use client'

import { AlertContextType } from '@/types/global-state/alert.types';
import { createContext, useContext } from 'react';

const defaultAlertContextValue: AlertContextType = {
  alert: { show: false, text: '', variant: '' },
  triggerAlert: () => { },
};

const AlertContext = createContext<AlertContextType>(defaultAlertContextValue);

export const useAlert = () => useContext(AlertContext);

export default AlertContext;
