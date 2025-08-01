// src/components/sections/aboutUsPage/promo.data.ts

// ВНИМАНИЕ: данные без JSX. Заголовок задаём строками, разрывы строки делает компонент.
// Описания оставлены в HTML, чтобы сохранить неразрывные пробелы (&nbsp;) как в исходнике.

import PromoSectionImage1 from "@/assets/PromoSection1.png";
import PromoSectionImage2 from "@/assets/PromoSection2.png";

export interface PromoSectionData {
  titleLines: string[]; // Строки заголовка (рендерим с <br/>)
  descriptionHtml: string; // HTML-описание (с &nbsp;)
  buttonInitialText: string;
  buttonHoverText?: string; // Зарезервировано, если понадобится
  buttonLink: string;
  imageUrl1: string;
  imageUrl2: string;
  backgroundColor: string; // Tailwind-класс фона блока с текстом
}

export const PROMO_SECTION: PromoSectionData = {
  titleLines: ["ORLOV", "made in RUSSIA"],
  descriptionHtml:
    "Бренд товаров&nbsp;и&nbsp;аксессуаров под названием “ORLOV made&nbsp;in&nbsp;RUSSIA” направлен на слияние премиального качества&nbsp;и&nbsp;государственного стиля. Наша цель&nbsp;— возродить любовь&nbsp;к&nbsp;нашей стране, сделать модной российскую продукцию. Мы готовы доказать миру, что нам есть чем&nbsp;гордиться! Через наши товары мы транслируем философию, которая уходит&nbsp;в&nbsp;историю российского дворянства. Мы сохраняем традиции&nbsp;и&nbsp;государственность. ORLOV&nbsp;— больше, чем&nbsp;бренд.",
  buttonInitialText: "Начать сейчас",
  buttonHoverText: "В магазин!",
  buttonLink: "/catalog",
  imageUrl1: PromoSectionImage2, // как в исходном файле: сначала 2, потом 1
  imageUrl2: PromoSectionImage1,
  backgroundColor: "bg-primary",
};
