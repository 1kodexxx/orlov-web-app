// src/data/aboutUsData/delivery.data.ts

export type DeliveryIcon = "shield" | "activity" | "anchor" | "user" | "check";

export interface DeliveryIntro {
  title: string;
  description: string;
}

export interface DeliveryStep {
  icon: DeliveryIcon;
  title: string;
  text: string;
}

export interface DeliveryData {
  intro: DeliveryIntro;
  steps: DeliveryStep[];
}

export const DELIVERY_DATA: DeliveryData = {
  intro: {
    title: "Доставка по миру",
    description:
      "Мы обеспечиваем быструю и надёжную доставку по России и МИРУ. Наши товары тщательно упаковываются, чтобы гарантировать их сохранность. Выберите любой способ доставки из предложенных вариантов. Если у Вас возникли вопросы по логистике, мы предложим удобные решения в кратчайшие сроки. Мы предлагаем подробное отслеживание и прозрачную консультационную поддержку по товарам.",
  },
  steps: [
    {
      icon: "shield",
      title: "Шаг 1",
      text: "Выберите изысканный чехол из премиальной коллекции.",
    },
    {
      icon: "activity",
      title: "Шаг 2",
      text: "Укажите модель телефона и цвет.",
    },
    {
      icon: "anchor",
      title: "Шаг 3",
      text: "Оформите заказ через безопасную форму оплаты.",
    },
    {
      icon: "user",
      title: "Шаг 4",
      text: "Мы упакуем и отправим ваш заказ.",
    },
    {
      icon: "check",
      title: "Готово",
      text: "Наслаждайтесь качеством и стилем.",
    },
  ],
};
