import Auth from './auth/reducer';
import App from './app/reducer';
// import Box from './box/reducer';
import Maps from './map/reducer';
import Contacts from './contacts/reducer';
import Problems from './problem/reducer';
// import DynamicChartComponent from './dynamicEchart/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
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
  Problems,
  // DynamicChartComponent,
  drawer,
  modal,
  BeachList,
};
