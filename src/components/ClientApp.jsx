'use client';

import React, { useState, useEffect } from 'react';
import { AppProvider } from '../context/AppContext';
import { App } from '../App';

export default function ClientApp({ initialSlug }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ background: '#f6f7fa' }}
      >
        <div
          className="spinner-border"
          style={{ color: '#0f626a', width: '3rem', height: '3rem' }}
          role="status"
        >
          <span className="visually-hidden">লোড হচ্ছে...</span>
        </div>
      </div>
    );
  }

  return (
    <AppProvider initialSlug={initialSlug}>
      <App />
    </AppProvider>
  );
}
