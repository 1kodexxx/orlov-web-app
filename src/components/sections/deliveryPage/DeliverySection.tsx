import React from "react";

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Шаг 1",
    description:
      "Выберите изысканный чехол из нашей премиальной коллекции, который идеально подчеркнёт ваш стиль.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6 text-gold"
        viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Шаг 2",
    description:
      "Укажите модель вашего телефона и выберите желаемый цвет, чтобы чехол идеально подошёл.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6 text-gold"
        viewBox="0 0 24 24">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    title: "Шаг 3",
    description:
      "Оформите заказ через безопасную форму оплаты. Мы гарантируем надёжность и конфиденциальность.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6 text-gold"
        viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="3" />
        <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3" />
      </svg>
    ),
  },
  {
    title: "Шаг 4",
    description:
      "Мы бережно упакуем и оперативно отправим ваш заказ. Вы получите трек-номер для отслеживания.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6 text-gold"
        viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Готово",
    description:
      "Получите ваш элитный чехол и наслаждайтесь качеством, стилем и надёжной защитой вашего телефона.",
    icon: (
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-6 h-6 text-gold"
        viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
  },
];

const StepsSection: React.FC = () => (
  <section className="bg-dark px-5 py-24 text-white">
    <div className="container mx-auto flex flex-wrap">
      <div className="w-full lg:w-2/5 md:pr-10 md:py-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`flex relative ${
              idx !== steps.length - 1 ? "pb-12" : ""
            }`}>
            {idx !== steps.length - 1 && (
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-full w-1 bg-gold opacity-50 pointer-events-none" />
              </span>
            )}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold inline-flex items-center justify-center text-dark relative z-10">
              {step.icon}
            </div>
            <div className="flex-grow pl-4">
              <h2 className="mb-1 text-sm font-semibold tracking-wider uppercase text-gold">
                {step.title}
              </h2>
              <p className="leading-relaxed text-gray-300">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full lg:w-3/5 md:w-1/2 mt-12 md:mt-0">
        <img
          className="object-cover object-center rounded-lg"
          src="https://dummyimage.com/1200x500/33302e/ffd700"
          alt="Пошаговая инструкция"
        />
      </div>
    </div>
  </section>
);

export default StepsSection;
