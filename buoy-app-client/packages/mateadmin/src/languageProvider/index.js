import Enlang from './entries/en-US';
import Itlang from './entries/it_IT';
import Eslang from './entries/es_ES';
import Frlang from './entries/fr_FR';

const AppLocale = {
  en: Enlang,
  it: Itlang,
  es: Eslang,
  fr: Frlang,
};

if (!Intl.PluralRules) {
  require('@formatjs/intl-pluralrules/polyfill');
  // require(AppLocale.en.data); // Add locale data for de
  // require(AppLocale.zh.data); // Add locale data for de
  // require(AppLocale.sa.data); // Add locale data for de
  // require(AppLocale.it.data); // Add locale data for de
  // require(AppLocale.es.data); // Add locale data for de
  // require(AppLocale.fr.data); // Add locale data for de
}

export default AppLocale;
