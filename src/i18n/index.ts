import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ptProfile from "./pt/profile.json";
import ptHome from "./pt/home.json";
import ptErrors from "./pt/errors.json";

import enProfile from "./en/profile.json";
import enErrors from "./en/errors.json";
import enHome from "./en/home.json";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      profile: ptProfile,
      errors: ptErrors,
      home: ptHome,
    },
    en: {
      profile: enProfile,
      errors: enErrors,
      home: enHome,
    },
  },
  lng: "pt",
  fallbackLng: "en",
  ns: ["profile", "errors", "home"],
  defaultNS: "profile",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
