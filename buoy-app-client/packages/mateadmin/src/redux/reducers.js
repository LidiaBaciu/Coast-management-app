import Auth from './auth/reducer';
import App from './app/reducer';
// import Box from './box/reducer';
import Maps from './map/reducer';
import Contacts from './contacts/reducer';
import Invoices from './invoice/reducer';
// import DynamicChartComponent from './dynamicEchart/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import InstagramWidget from './instagramWidget/reducers';
import drawer from './drawer/reducer';
import modal from './modal/reducer';
import BeachList from './beachList/reducer'

export default {
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  // Box,
  Maps,
  Contacts,
  Invoices,
  // DynamicChartComponent,
  InstagramWidget,
  drawer,
  modal,
  BeachList,
};
