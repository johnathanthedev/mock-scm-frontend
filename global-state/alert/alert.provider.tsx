'use client'

import styles from '@/styles/components/alert/index.module.css';
import { AlertState } from '@/types/global-state/alert.types';
import classNames from 'classnames';
import React, { ReactNode, useEffect, useState } from 'react';
import AlertContext from './alert.context';

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({ show: false, text: '', variant: '' });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (alert.show) {
      setShowAlert(true);
      timer = setTimeout(() => {
        setShowAlert(false);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [alert]);

  const triggerAlert = (text: string, variant: 'Success' | 'Warning' | 'Danger' = 'Success') => {
    setAlert({ show: true, text, variant });
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2500);
  };

  const handleTransitionEnd = () => {
    if (!showAlert) {
      setAlert(prev => ({ ...prev, show: false }));
    }
  };

  const alertClass = classNames(styles.alert, {
    [styles.visible]: showAlert,
    [styles.success]: alert.variant === 'Success',
    [styles.warning]: alert.variant === 'Warning',
    [styles.danger]: alert.variant === 'Danger',
  });

  return (
    <AlertContext.Provider value={{ alert, triggerAlert }}>
      <div className={`${alertClass} ${showAlert ? styles.visible : ''}`} onTransitionEnd={handleTransitionEnd}>
        {alert.text}
      </div>
      {children}
    </AlertContext.Provider>
  );
};
