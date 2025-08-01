// src/data/aboutUsData/contact.data.ts

import type { IconType } from "react-icons";
import { FaVk, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

export interface ContactFormField {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder: string;
  required?: boolean;
  gridSpan?: "full" | "half";
  rows?: number; // только для textarea
}

export interface PolicyLinks {
  termsText: string;
  termsHref: string;
  privacyText: string;
  privacyHref: string;
  consentLead: string;
}

export interface CompanyInfo {
  name: string;
  addressLines: string[];
  postcode: string;
}

export interface PhoneInfo {
  lead: string;
  tel: string;
  telHref: string;
}

export interface EmailInfo {
  email: string;
  mailtoHref: string;
}

export interface SocialLink {
  id: "vk" | "telegram" | "whatsapp";
  label: string;
  href: string;
  /** Иконку маппим в компоненте, чтобы не тянуть React-элементы в данные */
}

export interface ContactTexts {
  title: string;
  description: string;
  submitText: string;
  companyBlockTitle: string;
  addressBlockTitle: string;
  phoneBlockTitle: string;
  emailBlockTitle: string;
  socialsBlockTitle: string;
}

export interface ContactData {
  texts: ContactTexts;
  formFields: ContactFormField[];
  policy: PolicyLinks;
  company: CompanyInfo;
  phone: PhoneInfo;
  email: EmailInfo;
  socials: SocialLink[];
}

/** Данные секции контактов */
export const CONTACT_DATA: ContactData = {
  texts: {
    title: "Контакты",
    description:
      "У Вас есть вопрос или предложение? Мы всегда на связи. Свяжитесь с нами удобным способом, и мы обязательно ответим как можно скорее.",
    submitText: "Отправить сообщение",
    companyBlockTitle: "Информация о компании:",
    addressBlockTitle: "Адрес:",
    phoneBlockTitle: "Позвоните нам:",
    emailBlockTitle: "Почта для связи:",
    socialsBlockTitle: "Соцсети:",
  },

  formFields: [
    {
      id: "firstName",
      label: "Ваше имя",
      type: "text",
      placeholder: "Ваше имя",
      required: true,
      gridSpan: "half",
    },
    {
      id: "lastName",
      label: "Ваша фамилия",
      type: "text",
      placeholder: "Ваша фамилия",
      required: true,
      gridSpan: "half",
    },
    {
      id: "email",
      label: "Ваш email",
      type: "email",
      placeholder: "name@example.com",
      required: true,
      gridSpan: "half",
    },
    {
      id: "phone",
      label: "Ваш телефон",
      type: "tel",
      placeholder: "+7 (___) ___-__-__",
      required: true,
      gridSpan: "half",
    },
    {
      id: "message",
      label: "Ваше сообщение",
      type: "textarea",
      placeholder: "Введите сообщение...",
      required: true,
      gridSpan: "full",
      rows: 6,
    },
  ],

  policy: {
    consentLead: "Отправляя эту форму, вы соглашаетесь с",
    termsText: "Условиями обслуживания",
    termsHref: "/terms",
    privacyText: "Политикой конфиденциальности",
    privacyHref: "/privacy",
  },

  company: {
    name: "Orlov Brand",
    addressLines: ["Россия, г. Москва,", "ул. Мнёвники, дом 5"],
    postcode: "123308",
  },

  phone: {
    lead: "Мы всегда готовы помочь вам.",
    tel: "+7 (911) 332-29-17",
    telHref: "tel:+7-911-332-29-17",
  },

  email: {
    email: "orlov_brand_777@vk.com",
    mailtoHref: "mailto:orlov_brand_777@vk.com",
  },

  socials: [
    {
      id: "vk",
      label: "VK",
      href: "https://vk.com/orlov_brand_rus777",
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/ORLOV_brand777",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/89210428777",
    },
  ],
};

/** Маппинг ID → иконка. Оставляем здесь тип для удобства импорта в компоненте. */
export const CONTACT_ICON_MAP: Record<SocialLink["id"], IconType> = {
  vk: FaVk,
  telegram: FaTelegramPlane,
  whatsapp: FaWhatsapp,
};
