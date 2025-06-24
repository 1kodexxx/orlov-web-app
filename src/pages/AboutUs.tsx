import PromoSection from "@/components/PromoSection";
import Features from "@/components/Features";

import PromoSectionImage1 from "@/assets/PromoSection1.png";
import PromoSectionImage2 from "@/assets/PromoSection1.png";

const AboutUs = () => {
  return (
    <>
      <PromoSection
        title="ORLOV MADE IN RUSSIA"
        description="                Бренд товаров&nbsp;и&nbsp;аксессуаров под названием “ORLOV made
                in RUSSIA” направлен на слияние премиального
                качества&nbsp;и&nbsp;государственного стиля. Наша цель —
                возродить любовь к&nbsp;нашей стране, сделать модной российскую
                продукцию. Мы готовы доказать миру, что нам есть чем гордиться!
                Через наши товары мы транслируем философию, которая уходит
                в&nbsp;историю российского дворянства. Мы сохраняем традиции
                и&nbsp;государственность. ORLOV — больше, чем бренд."
        buttonText="Начать сейчас"
        buttonLink="/catalog"
        imageUrl1={PromoSectionImage1}
        imageUrl2={PromoSectionImage2}
      />
      <Features />
    </>
  );
};

export default AboutUs;
