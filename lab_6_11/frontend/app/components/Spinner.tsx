import React from 'react';

interface SpinnerProps {
  message?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  message = 'Loading...',
}) => {
  return (
    <>
      <style>{`
        @keyframes spinner-pulse {
          0%, 80%, 100% {
            box-shadow: 0 0;
            height: 4em;
          }
          40% {
            box-shadow: 0 -2em;
            height: 5em;
          }
        }

        .spinner-bar {
          animation: spinner-pulse 1s infinite ease-in-out;
        }

        .spinner-bar-left {
          animation-delay: -0.32s;
        }

        .spinner-bar-center {
          animation-delay: -0.16s;
        }
      `}</style>
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
        <div className="relative mx-auto text-[11px] transform-gpu" role="status" aria-label={message}>
          <div className="spinner-bar spinner-bar-left absolute top-0 -left-[1.5em] w-4 h-16 bg-gray-800 dark:bg-white" />
          <div className="spinner-bar spinner-bar-center w-4 h-16 bg-gray-800 dark:bg-white" />
          <div className="spinner-bar absolute top-0 left-[1.5em] w-4 h-16 bg-gray-800 dark:bg-white" />
        </div>
        <p className="mt-8 text-gray-700 dark:text-gray-300 text-lg font-medium">
          {message}
        </p>
      </div>
    </>
  );
};
