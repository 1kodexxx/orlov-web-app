// src/components/sections/contact/ContactSection.tsx

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CONTACT_DATA,
  CONTACT_ICON_MAP,
} from "@/data/contactsData/contact.data";

// Контейнер для всей секции
const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

// Анимация для каждой основной группы
const groupVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Контейнер для правого столбца
const contactColumnVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

// Анимация для каждой карточки справа
const contactItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Анимация для текста + кнопки (появляются последними)
const finalFormPartVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ContactSection: React.FC = () => {
  const { texts, formFields, policy, company, phone, email, socials } =
    CONTACT_DATA;

  return (
    <section className="w-full min-h-screen bg-background pt-4 md:pt-8 lg:pt-0 pb-12 px-4 flex items-center justify-center overflow-y-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        className="max-w-[1245px] mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-start md:items-center">
        {/* Левая колонка — Форма */}
        <div className="md:col-span-2 space-y-6">
          {/* Заголовок */}
          <motion.h2
            variants={groupVariants}
            className="text-3xl sm:text-4xl font-bold text-primary text-center md:text-left">
            {texts.title}
          </motion.h2>

          {/* Описание */}
          <motion.p
            variants={groupVariants}
            className="text-text-secondary text-center md:text-left">
            {texts.description}
          </motion.p>

          {/* Поля формы */}
          <motion.form variants={groupVariants} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formFields
                .filter((f) => f.type !== "textarea")
                .map((field) => (
                  <div
                    key={field.id}
                    className={
                      field.gridSpan === "full" ? "sm:col-span-2" : undefined
                    }>
                    <label className="block mb-2 text-sm font-medium text-text-secondary">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full border border-[#e5d870] p-3 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-[#e5d870]"
                      required={field.required}
                    />
                  </div>
                ))}
            </div>

            {formFields
              .filter((f) => f.type === "textarea")
              .map((field) => (
                <div key={field.id}>
                  <label className="block mb-2 text-sm font-medium text-text-secondary">
                    {field.label}
                  </label>
                  <textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    className="w-full h-16 border border-[#e5d870] p-3 rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-[#e5d870]"
                    rows={field.rows ?? 6}
                    required={field.required}
                  />
                </div>
              ))}
          </motion.form>

          {/* Текст + кнопка — последняя анимация */}
          <motion.div
            variants={finalFormPartVariants}
            className="space-y-4 flex flex-col items-start">
            <p className="text-xs text-text-secondary">
              {policy.consentLead}{" "}
              <a
                href={policy.termsHref}
                className="text-primary hover:underline cursor-pointer">
                {policy.termsText}
              </a>{" "}
              и{" "}
              <a
                href={policy.privacyHref}
                className="text-primary hover:underline cursor-pointer">
                {policy.privacyText}
              </a>
              .
            </p>

            <button
              type="submit"
              className="bg-primary text-background py-3 px-6 rounded-lg transition-colors duration-200">
              {texts.submitText}
            </button>
          </motion.div>
        </div>

        {/* Контактная информация */}
        <motion.div variants={groupVariants}>
          <motion.div variants={contactColumnVariants} className="space-y-8">
            <motion.div variants={contactItemVariants}>
              <h4 className="font-semibold text-primary mb-2">
                {texts.companyBlockTitle}
              </h4>
              <p className="text-[#ccc]">{company.name}</p>
            </motion.div>

            <motion.div variants={contactItemVariants}>
              <h4 className="font-semibold text-primary mb-2">
                {texts.addressBlockTitle}
              </h4>
              <p className="text-[#ccc]">
                {company.addressLines.map((l, i) => (
                  <span key={i}>
                    {l}
                    {i === 0 && <br />}
                  </span>
                ))}
              </p>
              <p className="text-[#ccc]">Почтовый индекс: {company.postcode}</p>
            </motion.div>

            <motion.div variants={contactItemVariants}>
              <h4 className="font-semibold text-primary mb-2">
                {texts.phoneBlockTitle}
              </h4>
              <p className="text-[#ccc] mb-1">{phone.lead}</p>
              <a href={phone.telHref} className="text-primary hover:underline">
                {phone.tel}
              </a>
            </motion.div>

            <motion.div variants={contactItemVariants}>
              <h4 className="font-semibold text-primary mb-2">
                {texts.emailBlockTitle}
              </h4>
              <a
                href={email.mailtoHref}
                className="text-[#ccc] hover:underline">
                {email.email}
              </a>
            </motion.div>

            <motion.div variants={contactItemVariants}>
              <h4 className="font-semibold text-primary mb-2">
                {texts.socialsBlockTitle}
              </h4>
              <div className="flex items-center gap-4 text-gold text-2xl">
                {socials.map((s) => {
                  const Icon = CONTACT_ICON_MAP[s.id];
                  return (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="text-[#ccc] hover:text-white transition"
                      title={s.label}>
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
