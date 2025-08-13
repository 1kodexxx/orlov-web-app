// src/user/account/Breadcrumbs.tsx
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs: React.FC<{ className?: string }> = ({ className }) => (
  <nav className={`mb-4 flex ${className ?? ""}`} aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li className="inline-flex items-center">
        <Link
          to="/"
          className="inline-flex items-center text-sm font-medium text-text.secondary hover:text-primary">
          <svg
            className="me-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
            />
          </svg>
          Главная
        </Link>
      </li>

      <li>
        <div className="flex items-center">
          <svg
            className="mx-1 h-4 w-4 text-gray-500 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
          <Link
            to="/account"
            className="ms-1 text-sm font-medium text-text.secondary hover:text-primary md:ms-2">
            Личный кабинет
          </Link>
        </div>
      </li>

      <li aria-current="page">
        <div className="flex items-center">
          <svg
            className="mx-1 h-4 w-4 text-gray-500 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
          <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
            Аккаунт
          </span>
        </div>
      </li>
    </ol>
  </nav>
);

export default Breadcrumbs;
