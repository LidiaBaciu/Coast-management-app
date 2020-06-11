import { getDefaultPath } from '../../helpers/urlSync';

const options = [
  {
    label: 'sidebar.dashboard',
    key: 'dashboard',
  },
  {
    label: 'sidebar.blankPage',
    leftIcon: 'blank',
    key: 'blank-page',
  },
  {
    label: 'Report a problem',
    leftIcon: 'error',
    hideBreadCrumb: true,
    key: 'report-problem',
  },
  {
    label: 'Beaches',
    leftIcon: 'table',
  },
  {
    label: 'Fishes',
    leftIcon: 'table',
  },
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
