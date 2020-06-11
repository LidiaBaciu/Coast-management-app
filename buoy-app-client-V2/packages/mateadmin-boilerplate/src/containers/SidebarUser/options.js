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
    label: 'Beaches',
    leftIcon: 'table',
  },
  {
    label: 'Buoys',
    leftIcon: 'table',
  },
  {
    label: 'Fishes',
    leftIcon: 'table',
  },
  {
    label: 'Projects',
    leftIcon: 'select_all',
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
