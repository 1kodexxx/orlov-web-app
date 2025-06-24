import PromoSection from "@/components/PromoSection";
import Features from "@/components/Features";

import PromoSectionImage1 from "@/assets/PromoSection1.png";
import PromoSectionImage2 from "@/assets/PromoSection2.png";

const AboutUs = () => {
  return (
    <>
      <PromoSection
        title="ORLOV MADE IN RUSSIA"
        description="Бренд товаров и аксессуаров под названием “ORLOV made in RUSSIA” направлен на слияние премиального качества и государственного стиля. Наша цель — возродить любовь к нашей стране, сделать модной российскую продукцию. Мы готовы доказать миру, что нам есть чем&nbsp;гордиться! Через наши товары мы транслируем философию, которая уходит в историю российского дворянства. Мы сохраняем традиции и государственность. ORLOV — больше, чем бренд."
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
