import heroBackground from "@/assets/background.png";
import type { BackgroundImage } from "@/types/images";

export const heroBg: BackgroundImage = {
  id: "hero",
  src: heroBackground,
  alt: "Hero background image",
  position: "center",
  size: "cover",
  repeat: "no-repeat",
  overlayColor: "rgba(0, 0, 0, 0.5)",
  brightness: 1,
  blur: false,
};
