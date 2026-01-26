import { useTranslation } from "react-i18next";


export default function LanguageSwitcher() {
const { i18n } = useTranslation();


const toggleLang = () => {
const lang = i18n.language === "en" ? "ar" : "en";
i18n.changeLanguage(lang);
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
};


return (
<button onClick={toggleLang} className="text-xs border px-2 py-1 rounded">
{i18n.language.toUpperCase()}
</button>
);
}