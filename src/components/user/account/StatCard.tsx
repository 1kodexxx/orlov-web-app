import React from "react";

const StatCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: number;
  delta?: number;
  compare?: string;
}> = ({ icon, title, value, delta, compare }) => {
  const up = (delta ?? 0) >= 0;
  return (
    <div>
      <div className="mb-2 h-8 w-8 text-gray-400">{icon}</div>
      <h3 className="mb-2 text-text.secondary">{title}</h3>
      <span className="flex items-center text-2xl font-bold text-white">
        {value}
        {typeof delta === "number" && (
          <span
            className={`ms-2 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
              up
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            }`}>
            <svg
              className="-ms-1 me-1 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              {up ? (
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              ) : (
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 20V7m0 13-4-4m4 4 4-4"
                />
              )}
            </svg>
            {Math.abs(delta)}%
          </span>
        )}
      </span>
      {compare && (
        <p className="mt-2 flex items-center text-sm text-text.secondary">
          <svg
            className="me-1.5 h-4 w-4 text-text.secondary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {compare}
        </p>
      )}
    </div>
  );
};

export default StatCard;
