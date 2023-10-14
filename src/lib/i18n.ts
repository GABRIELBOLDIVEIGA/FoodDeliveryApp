import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const enTranslations = {};

const ptTranslations = {};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      ...enTranslations
    },
    pt: {
      ...ptTranslations
    },
  },
  lng: 'pt',
})