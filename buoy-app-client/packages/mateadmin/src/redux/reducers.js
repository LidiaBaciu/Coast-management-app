import Auth from './auth/reducer';
import App from './app/reducer';
import Calendar from './calendar/reducer';
// import Box from './box/reducer';
import Maps from './map/reducer';
// import Notes from './notes/reducer';
import Todos from './todos/reducer';

import Notes from './notes/reducer';
import Contacts from './contacts/reducer';
import Invoices from './invoice/reducer';
// import DynamicChartComponent from './dynamicEchart/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import InstagramWidget from './instagramWidget/reducers';
import CustomAppReducers from '../customApp/redux/reducers';
import scrumBoard from './scrumBoard/reducer';
import drawer from './drawer/reducer';
import modal from './modal/reducer';
import BeachList from './beachList/reducer'

export default {
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Calendar,
  // Box,
  Maps,
  // Notes,
  Todos,
  Notes,
  Contacts,
  Invoices,
  // DynamicChartComponent,
  InstagramWidget,
  scrumBoard,
  drawer,
  modal,
  BeachList,
  ...CustomAppReducers,
};
