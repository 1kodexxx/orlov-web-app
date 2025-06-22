export interface BackgroundImage {
  id: string; // уникальный идентификатор
  src: string; // путь или URL картинки
  alt?: string; // описание (для SEO или fallback)
  position?: string; // CSS background-position (например, 'center', 'top')
  size?: string; // CSS background-size (например, 'cover', 'contain')
  repeat?: string; // CSS background-repeat (обычно 'no-repeat')
  overlayColor?: string; // цвет overlay-а (если накладываешь тень)
  brightness?: number; // яркость (1 = 100%)
  blur?: boolean; // нужно ли размытие?
}
