import PromoSection from "@/components/sections/PromoSection";
import Features from "@/components/sections/Features";

import PromoSectionImage1 from "@/assets/PromoSection1.png";
import PromoSectionImage2 from "@/assets/PromoSection2.png";

const AboutUs = () => {
  return (
    <>
      <PromoSection
        title={
          <>
            ORLOV <br /> MADE IN RUSSIA
          </>
        }
        description="Бренд товаров&nbsp;и&nbsp;аксессуаров под названием “ORLOV made&nbsp;in&nbsp;RUSSIA” направлен на слияние премиального качества&nbsp;и&nbsp;государственного стиля. Наша цель&nbsp;— возродить любовь&nbsp;к&nbsp;нашей стране, сделать модной российскую продукцию. Мы готовы доказать миру, что нам есть чем&nbsp;гордиться! Через наши товары мы транслируем философию, которая уходит&nbsp;в&nbsp;историю российского дворянства. Мы сохраняем традиции&nbsp;и&nbsp;государственность. ORLOV&nbsp;— больше, чем&nbsp;бренд."
        buttonInitialText="Начать сейчас 🛍️"
        buttonHoverText="Погнали! ✨"
        buttonLink="/catalog"
        imageUrl1={PromoSectionImage1}
        imageUrl2={PromoSectionImage2}
      />
      <Features />
    </>
  );
};

export default AboutUs;
