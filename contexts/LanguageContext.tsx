"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { translations, type Lang, type Translations } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("cas_lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("cas_lang") as Lang | null;
    if (saved === "fr" || saved === "ar") {
      setLang(saved);
    } else {
      document.documentElement.lang = "fr";
      document.documentElement.dir = "ltr";
    }
  }, [setLang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
        isRTL: lang === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
