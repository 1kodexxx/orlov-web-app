import React from "react";
import {
  FiShield,
  FiActivity,
  FiAnchor,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";

const steps = [
  {
    icon: <FiShield />,
    title: "Шаг 1",
    text: "Выберите изысканный чехол из премиальной коллекции.",
  },
  {
    icon: <FiActivity />,
    title: "Шаг 2",
    text: "Укажите модель телефона и цвет.",
  },
  {
    icon: <FiAnchor />,
    title: "Шаг 3",
    text: "Оформите заказ через безопасную форму оплаты.",
  },
  {
    icon: <FiUser />,
    title: "Шаг 4",
    text: "Мы упакуем и отправим ваш заказ.",
  },
  {
    icon: <FiCheckCircle />,
    title: "Готово",
    text: "Наслаждайтесь качеством и стилем.",
  },
];

const DeliverySection: React.FC = () => {
  return (
    <section className="bg-background text-text-primary p-8 space-y-10 max-w-[1310px] mx-auto">
      {/* Шаги */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center p-6 bg-secondary rounded-xl shadow-lg text-center">
            <div className="text-3xl mb-3 text-primary">{step.icon}</div>
            <h3 className="text-xl font-bold mb-2 text-primary">
              {step.title}
            </h3>
            <p className="text-text-secondary">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DeliverySection;
