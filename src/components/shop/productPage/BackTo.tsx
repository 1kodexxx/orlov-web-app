import { useNavigate } from "react-router-dom";

export default function BackTo() {
  const navigate = useNavigate();
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-16 mt-4 lg:mt-1">
      <button
        onClick={() => navigate(-1)}
        className="text-primary hover:underline flex items-center gap-2">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Назад в каталог
      </button>
    </div>
  );
}
