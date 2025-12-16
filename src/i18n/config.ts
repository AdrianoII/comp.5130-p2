import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esCommon from "../locales/es/common.json";
import enCommon from "../locales/en/common.json";
import frCommon from "../locales/fr/common.json";
import jaCommon from "../locales/ja/common.json";
import koCommon from "../locales/ko/common.json";

export const resources = {
    es: {
        common: esCommon,
    },
    en: {
        common: enCommon,
    },
    fr: {
        common: frCommon,
    },
    ja: {
        common: jaCommon,
    },
    ko: {
        common: koCommon,
    }
} as const;

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ["querystring", "localStorage", "navigator"],
            caches: ["localStorage"],
        },
    });

    export default i18n;
