import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    lng: "ar",
    fallbackLng: "ar",
    debug: true,
    resources: {
        en: {
            translation: {
                name: "name",
          
            },
        },
        ar: {
            translation: {
                name:"اختبارر6",
           
            },
        },
    },
});
export default i18n;