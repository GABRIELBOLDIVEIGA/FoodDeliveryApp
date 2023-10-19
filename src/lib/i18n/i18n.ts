import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { localeEN, localePT } from './locales';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...localeEN
      },
    },
    pt: {
      translation: {
        ...localePT
      },
    },
  },
  lng: "pt",
});
