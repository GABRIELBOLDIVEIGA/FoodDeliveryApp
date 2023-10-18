import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import themePT from "src/components/ToggleTheme/locale/pt.json";
import themeEN from "src/components/ToggleTheme/locale/en.json";

import loginPT from "src/pages/login/locale/pt.json";
import loginEN from "src/pages/login/locale/en.json";

import bannerHomePT from "src/pages/home/Banner/locale/pt.json";
import bannerHomeEN from "src/pages/home/Banner/locale/en.json";

import categoriesHomePT from "src/pages/home/Categories/locale/pt.json";
import categoriesHomeEN from "src/pages/home/Categories/locale/en.json";

import dailyDealHomePT from "src/pages/home/DailyDeal/locale/pt.json";
import dailyDealHomeEN from "src/pages/home/DailyDeal/locale/en.json";

import homePT from "src/pages/home/locale/pt.json";
import homeEN from "src/pages/home/locale/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        ...themeEN,
        ...loginEN,
        ...bannerHomeEN,
        ...categoriesHomeEN,
        ...dailyDealHomeEN,
        ...homeEN,
      },
    },
    pt: {
      translation: {
        ...themePT,
        ...loginPT,
        ...bannerHomePT,
        ...categoriesHomePT,
        ...dailyDealHomePT,
        ...homePT,
      },
    },
  },
  lng: "pt",
});
