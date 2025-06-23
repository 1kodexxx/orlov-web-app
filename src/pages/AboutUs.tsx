import PromoSection from "@/components/PromoSection";
import Features from "@/components/Features";

const AboutUs = () => {
  return (
    <>
      <PromoSection
        title="ORLOV MADE IN RUSSIA"
        description="Бренд товаров и аксессуаров под названием “ORLOV made in RUSSIA” Направлен на слияние премиального качества и государственного стиля. Наша ЦЕЛЬ-возродить любовь к нашей стране на постоянной основе, привить ценности и идеалы великого государства, сделать МОДНОЙ российскую продукцию. Мы готовы доказать всему МИРУ, что нам есть чем гордиться! Через наши товары и аксессуары мы транслируем философию, которая уходит глубоко в историю древнего дворянского рода российской империи. Мы сохраняем традиции и государственность. Помним и чтим подвиги наших предков. Мы несем российский культурный код в массы. ORLOV- больше, чем бренд"
        buttonText="Начать сейчас"
        buttonLink="/catalog"
        imageUrl1="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?..."
        imageUrl2="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?..."
      />
      <Features />
    </>
  );
};

export default AboutUs;
