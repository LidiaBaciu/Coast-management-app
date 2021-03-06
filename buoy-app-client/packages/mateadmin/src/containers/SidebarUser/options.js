import { getDefaultPath } from '../../helpers/urlSync';

const options = [
  {
    label: 'sidebar.reportProblem',
    leftIcon: 'error',
    hideBreadCrumb: true,
    key: 'report-problem',
  },/*
  {
    label: 'sidebar.scrum-board',
    key: 'scrum-board',
    leftIcon: 'select_all',
    hideBreadCrumb: true,
  },*/
  {
    label: 'sidebar.beachesList',
    key: 'beaches-list',
    leftIcon: 'select_all',
    hideBreadCrumb: true,
  },
  {
    label: 'sidebar.buoysList',
    key: 'buoys-list',
    leftIcon: 'select_all',
    hideBreadCrumb: true,
  },
  {
    label: 'sidebar.fishes',
    key: 'fishes',
    leftIcon: 'select_all',
    hideBreadCrumb: true,
  },
  {
    label: 'sidebar.map',
    key: 'beachesmap',
    isNavTab: true,
    leftIcon: 'map',
    children: [
        {
          label: 'sidebar.beachesmap',
          key: 'beachesmap',
          default: true,
        },
        {
          label: 'sidebar.buoysmap',
          key: 'buoysmap',
        },
      ],
    },
  /*
  {
    label: 'sidebar.map',
    key: 'googlemap',
    isNavTab: true,
    leftIcon: 'map',
    children: [
      {
        label: 'sidebar.googlemap',
        key: 'googlemap',
        default: true,
      },
      {
        label: 'sidebar.leaflet',
        key: 'leafletmap',
      },
    ],
  },
  */
];
const getBreadcrumbOption = () => {
  const preKeys = getDefaultPath();
  let parent, activeChildren;
  options.forEach(option => {
    if (preKeys[option.key]) {
      parent = option;
      (option.children || []).forEach(child => {
        if (preKeys[child.key]) {
          activeChildren = child;
        }
      });
    }
  });
  return { parent, activeChildren };
};
export default options;
export { getBreadcrumbOption };
