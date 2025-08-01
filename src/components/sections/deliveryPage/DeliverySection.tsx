// src/components/sections/delivery/DeliverySection.tsx

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FiShield,
  FiActivity,
  FiAnchor,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";
import { nbspShort } from "@/utils/nbspShort";
import {
  DELIVERY_DATA,
  type DeliveryIcon,
} from "@/data/deliveryData/delivery.data";

const ICONS: Record<DeliveryIcon, React.ReactElement> = {
  shield: <FiShield />,
  activity: <FiActivity />,
  anchor: <FiAnchor />,
  user: <FiUser />,
  check: <FiCheckCircle />,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0, when: "beforeChildren", staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const DeliverySection: React.FC = () => {
  const { intro, steps } = DELIVERY_DATA;

  return (
    <section className="min-h-screen flex flex-col justify-center bg-background-default text-text-primary py-16 px-4 max-w-[1279px] mx-auto space-y-10">
      {/* Вводное описание */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="text-center mx-auto max-w-2xl">
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold mb-4 text-primary">
          {nbspShort(intro.title)}
        </motion.h2>
        <motion.p variants={itemVariants} className="text-text-secondary">
          {nbspShort(intro.description)}
        </motion.p>
      </motion.div>

      {/* Шаги */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
              filter: "brightness(1.1)",
            }}
            className="relative flex flex-col items-center p-6 bg-background-paper rounded-xl shadow-lg text-center transition-transform transition-filter cursor-pointer">
            <div className="w-16 h-16 flex items-center justify-center bg-secondary rounded-full mb-4">
              <span className="text-3xl text-primary">{ICONS[step.icon]}</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-primary">
              {nbspShort(step.title)}
            </h3>
            <p className="text-text-secondary">{nbspShort(step.text)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default DeliverySection;
