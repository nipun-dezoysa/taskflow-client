import { Spinner } from '@heroui/react';
import React from 'react'

function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner size="lg" color="primary" />
    </div>
  );
}

export default LoadingPage
