/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from "react-i18next";
import { useState, useLayoutEffect } from "react";
import { LanguageContext } from "./LanguageContenxt";

export const LanguageProvider = ({ children }: { children: JSX.Element }) => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();

  const [currentlanguage, setCurrentLenguage] = useState(language);

  useLayoutEffect(() => {
    const localLanguage = localStorage.getItem("language");

    if (localLanguage != null) {
      localStorage.setItem("language", localLanguage);
      changeLanguage(localLanguage);
      setCurrentLenguage(localLanguage);
    } else {
      const newLanguage = "pt";
      localStorage.setItem("language", newLanguage);
      changeLanguage(newLanguage);
      setCurrentLenguage(newLanguage);
    }
  }, []);

  const handleChangeLanguage = () => {
    const newLanguage = currentlanguage === "en" ? "pt" : "en";
    localStorage.setItem("language", newLanguage);
    changeLanguage(newLanguage);
    setCurrentLenguage(newLanguage);
  };

  const selectLanguage = (language: "en" | "pt") => {
    const newLanguage = language;
    localStorage.setItem("language", newLanguage);
    changeLanguage(newLanguage);
    setCurrentLenguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ selectLanguage, currentlanguage, handleChangeLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
