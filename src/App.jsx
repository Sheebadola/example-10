/* eslint-disable no-unused-vars */
import React from 'react';
import { IntlProvider } from 'react-intl';
import StudentReportCard from './components/reportCard';

import enMessages from './locales/en.json';
import esMessages from './locales/es.json';

const getLocaleMessages = (locale) => {
  switch (locale) {
    case 'es':
      return esMessages;
    default:
      return enMessages;
  }
};

const App = () => {
  const locale = 'es'; // Set the desired locale here
  const messages = getLocaleMessages(locale);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <StudentReportCard />
    </IntlProvider>
  );
};

export default App;
