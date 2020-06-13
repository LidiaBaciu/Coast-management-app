import { getDefaultPath } from '../../helpers/urlSync';
import getDevSidebar from '../../customApp/sidebar';

const options = [
  {
    label: 'sidebar.problemsReported',
    key: 'invoice',
    leftIcon: 'select_all',
    hideBreadCrumb: true,
  },
  {
    label: 'sidebar.scrum-board',
    key: 'scrum-board',
    leftIcon: 'select_all',
    hideBreadCrumb: true,
  },
  {
    label: 'Report a problem',
    leftIcon: 'error',
    hideBreadCrumb: true,
    key: 'report-problem',
  },
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
  ...getDevSidebar,
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
