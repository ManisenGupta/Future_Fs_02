import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
        Oops! Something went wrong
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        Try searching for a different location or check your internet connection.
      </p>
    </div>
  );
};

export default ErrorDisplay;