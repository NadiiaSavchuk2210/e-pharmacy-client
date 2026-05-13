'use client';

import { Toaster } from 'react-hot-toast';

const AppToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          borderRadius: '0.75rem',
          color: '#1d1e21',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
        },
        success: {
          style: {
            border: '1px solid rgba(89, 177, 122, 0.3)',
          },
        },
        error: {
          style: {
            border: '1px solid rgba(232, 80, 80, 0.35)',
          },
        },
      }}
    />
  );
};

export default AppToaster;
