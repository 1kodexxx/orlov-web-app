import React from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex justify-center items-center gap-2 text-sm text-text-secondary">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <a
                href={item.href}
                className="block transition-colors text-text-secondary hover:text-text-primary">
                {item.label}
              </a>
            </li>

            {index < items.length - 1 && (
              <li className="rtl:rotate-180 text-text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 20.247L15 3.747"
                  />
                </svg>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
