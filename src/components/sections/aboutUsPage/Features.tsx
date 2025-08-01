// src/components/sections/aboutUsPage/Features.tsx

import type { FC } from "react";
import { motion } from "framer-motion";
import { FaCrown, FaHandshake, FaGem } from "react-icons/fa";
import { Link } from "react-router-dom";
import { nbspShort } from "@/utils/nbspShort";
import {
  FEATURES,
  FEATURES_SECTION,
  type FeatureData,
  type FeatureIcon,
} from "@/data/aboutUs/features.data";

const ICONS: Record<FeatureIcon, React.ReactElement> = {
  crown: <FaCrown className="text-4xl text-primary-contrast" />,
  handshake: <FaHandshake className="text-4xl text-primary-contrast" />,
  gem: <FaGem className="text-4xl text-primary-contrast" />,
};

const Features: FC = () => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="py-16 px-4 text-text-secondary">
    <div className="mx-auto max-w-screen-xl px-0 sm:px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-4 text-center text-3xl font-bold text-primary md:text-4xl">
        {nbspShort(FEATURES_SECTION.title)}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-12 mx-auto max-w-2xl text-center text-lg text-text-secondary">
        {nbspShort(FEATURES_SECTION.lead)}
      </motion.p>

      <div className="flex flex-col md:flex-row md:space-x-8 gap-y-12 md:gap-y-0 items-stretch">
        {FEATURES.map((f: FeatureData, i: number) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 + i * 0.2 }}
            className="flex-1 flex flex-col justify-between items-center text-center p-8">
            <div className="rounded-full bg-primary p-6 mb-6">
              {ICONS[f.icon]}
            </div>

            <h3 className="text-xl font-semibold text-primary mb-6">
              {f.title.map((line, idx) => (
                <span key={idx} className="block">
                  {nbspShort(line)}
                </span>
              ))}
            </h3>

            <div className="prose prose-invert max-w-none space-y-4 mb-6">
              {f.description.map((para, idx) => (
                <p key={idx}>{nbspShort(para)}</p>
              ))}
            </div>

            <Link
              to={f.link.to}
              className="mt-auto text-primary hover:underline">
              {nbspShort(f.link.text)}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default Features;
