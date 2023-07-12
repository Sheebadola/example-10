// eslint-disable-next-line no-unused-vars
import React from "react";
import { IntlProvider, FormattedMessage } from "react-intl";
import Kannada from "../translations/kannada.json";
import Hindi from "../translations/hindi.json";
import English from "../translations/english.json";

const languageSet = ["en", "hi", "kn"];
const languages = navigator.languages;
console.log("lan edi anta",languages);
const setLanguage = languages.filter((lang) => languageSet.indexOf(lang) !== -1);

const selectedLanguage = (locale) => {
    let language;
    if (locale === "hi") {
        language = Hindi;
    } else if (locale === "kn") {
        language = Kannada;
    } else {
        language = English;
    }
    return language;
};

const translation = (id) => {
    const firstLanguage = selectedLanguage(setLanguage[0]);
    const secondLanguage = selectedLanguage(setLanguage[1]);
    if (firstLanguage[id]) return [setLanguage[0]];
    else if (secondLanguage[id]) return [setLanguage[1]];
    else return "";
};

const messages = (id) => {
    const [locale] = translation(id);
    return (
        <IntlProvider locale={locale} messages={selectedLanguage(locale)}>
            <FormattedMessage id={id} defaultMessage={id} />
        </IntlProvider>
    );
};
export default messages;