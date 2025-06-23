const Marquee = () => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-12 overflow-hidden bg-black/60 z-20">
      <div
        className="inline-block whitespace-nowrap leading-12 h-full"
        style={{ animation: "marquee 15s linear infinite" }}>
        <span className="text-white mx-8">🔥 Новинки поступили! 🔥</span>
        <span className="text-white mx-8">Скидки до 50%! Только сегодня.</span>
        <span className="text-white mx-8">Бесплатная доставка от 5000₽.</span>
        <span className="text-white mx-8">Подписывайтесь на наши новости!</span>
      </div>
    </div>
  );
};

export default Marquee;
