// src/data/home.data.ts

import InfoSectionImage1 from "@/assets/InfoSection1.png";
import InfoSectionImage2 from "@/assets/InfoSection2.png";
import InfoSectionImage3 from "@/assets/InfoSection3.png";
import InfoSectionImage4 from "@/assets/InfoSection4.png";
import InfoSectionImage5 from "@/assets/InfoSection5.png";

export interface TeaserSection {
  title: string;
  description: string; // может содержать \u00A0 и <br />
  imageUrl: string;
  reverse: boolean;
  initialButtonText: string;
  hoverButtonText: string;
  buttonLink: string;
}

export const SECTIONS: TeaserSection[] = [
  {
    title: "О Нас",
    description: `Мы\u00A0- компания из\u00A0России. Создаем премиальные и\u00A0элитарные аксессуары для\u00A0каждого человека. 
      Производим люксовые чехлы для\u00A0iPhone из\u00A0эксклюзивных материалов и\u00A0другие предметы роскоши. 
      Объединяем статус, стиль и\u00A0уникальный дизайн в\u00A0каждом изделии. 
      Наша цель\u00A0- предложить клиентам не\u00A0просто товар, а\u00A0целую философию и\u00A0идеологию!`,
    imageUrl: InfoSectionImage1,
    reverse: false,
    initialButtonText: "Узнать подробнее",
    hoverButtonText: "Вперёд!",
    buttonLink: "/about-us",
  },
  {
    title: "Каталог",
    description: `Погрузитесь в\u00A0мир эксклюзивных аксессуаров ORLOV, <br />где каждый элемент\u00A0— отражение Вашего стиля. Наш каталог включает в\u00A0себя: уникальный дизайн, премиальные материалы и\u00A0великолепное качество. Выбирайте идеальный аксессуар в\u00A0подарок или для\u00A0себя. Позвольте для\u00A0себя лучшее!`,
    imageUrl: InfoSectionImage2,
    reverse: true,
    initialButtonText: "Смотреть каталог",
    hoverButtonText: "Вперёд!",
    buttonLink: "/catalog",
  },
  {
    title: "Доставка",
    description: `Мы доставляем наши эксклюзивные товары по всей России и всему миру, быстро и безопасно. Надежная упаковка, премиальный сервис и гарантия сохранности на каждом этапе производства. Ваш стиль — в ваших руках, где бы вы <br />ни находились вместе с ORLOV.`,
    imageUrl: InfoSectionImage3,
    reverse: false,
    initialButtonText: "Узнать условия",
    hoverButtonText: "Вперёд!",
    buttonLink: "/delivery",
  },
  {
    title: "Контакты",
    description: `В случае, если у\u00A0Вас остались вопросы, свяжитесь с\u00A0нами любым удобным способом! Сотрудничество с\u00A0нашей компанией или обратная связь с\u00A0нашей командой. Мы всегда готовы помочь Вам и\u00A0проконсультировать по\u00A0любым вопросам!`,
    imageUrl: InfoSectionImage4,
    reverse: true,
    initialButtonText: "Связаться",
    hoverButtonText: "Вперёд!",
    buttonLink: "/contacts",
  },
  {
    title: "Отзывы",
    description: `Наши клиенты — наша гордость! Ознакомьтесь с\u00A0реальными отзывами о\u00A0качестве наших товаров, сервисе и\u00A0доставке. Оставляйте свои отзывы и\u00A0делитесь впечатлениями от\u00A0продукции ORLOV. Мы дорожим Вашим доверием к\u00A0нам и\u00A0всегда стремимся к\u00A0совершенству!`,
    imageUrl: InfoSectionImage5,
    reverse: false,
    initialButtonText: "Читать отзывы",
    hoverButtonText: "Вперёд!",
    buttonLink: "/reviews",
  },
];
