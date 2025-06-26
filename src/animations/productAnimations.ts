// src/animations/productAnimations.ts
export const productCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.1,
      ease: "easeOut",
    },
  }),
};

export const hoverAnimation = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300, damping: 20 },
};
