import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import themePT from "src/components/ToggleTheme/locale/pt.json"
import themeEN from "src/components/ToggleTheme/locale/en.json"
import loginEN from "src/pages/login/locale/en.json"
import loginPT from "src/pages/login/locale/pt.json"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      "translation": {
        ...loginEN,
        ...themeEN,
      }
    },
    pt: {
      "translation": {
        ...loginPT,
        ...themePT,
      }
    },
  },
  lng: 'pt',
})