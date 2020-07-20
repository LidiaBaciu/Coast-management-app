import React, { Component, lazy, Suspense } from 'react';
import Route from '../../components/utility/customRoute';
import { Switch } from 'react-router-dom';
import Loader from '../../components/utility/Loader';
import PageNotFound from '../Page/404';

const routes = [
  {
    path: '',
    component: lazy(() => import('../Widgets')),
  },
  {
    path: 'beaches-list/beach/:id',
    component: lazy(() => import('../BeachesList/beachDetails')),
  },
  {
    path: 'buoys-list',
    component: lazy(() => import('../BuoysList')),
  },
  {
    path: 'fishes',
    component: lazy(() => import('../Fishes')),
  },
  {
    path: 'report-problem',
    component: lazy(() => import('../ReportProblem/ReportProblemPage')),
  },
  {
    path: 'redux-forms',
    component: lazy(() => import('../Forms/ReduxForm')),
  },
  {
    path: 'beaches-list',
    component: lazy(() => import('../BeachesList')),
  },
  {
    path: 'user-details',
    component: lazy(() => import('../Forms/FormPage')),
  },
  {
    path: 'formik',
    component: lazy(() => import('../Forms/Formik')),
  },
  {
    path: 'button',
    component: lazy(() => import('../UiElements/Button')),
  },
  {
    path: 'contact',
    component: lazy(() => import('../Contact')),
  },
  {
    path: 'input',
    component: lazy(() => import('../UiElements/Input')),
  },
  {
    path: 'popover',
    component: lazy(() => import('../UiElements/Popover')),
  },
  {
    path: 'badges',
    component: lazy(() => import('../UiElements/Badges')),
  },
  {
    path: 'lists',
    component: lazy(() => import('../UiElements/Lists')),
  },
  {
    path: 'menus',
    component: lazy(() => import('../UiElements/Menus')),
  },
  {
    path: 'cards',
    component: lazy(() => import('../UiElements/Cards/index')),
  },
  {
    path: 'chips',
    component: lazy(() => import('../UiElements/Chips')),
  },
  {
    path: 'avatars',
    component: lazy(() => import('../UiElements/Avatars/index')),
  },
  {
    path: 'autocomplete',
    component: lazy(() => import('../UiElements/Autocomplete')),
  },
  {
    path: 'picker',
    component: lazy(() => import('../UiElements/Picker')),
  },
  {
    path: 'selection-control',
    component: lazy(() => import('../UiElements/SelectionControl')),
  },
  {
    path: 'dividers',
    component: lazy(() => import('../UiElements/Dividers/index')),
  },
  {
    path: 'select',
    component: lazy(() => import('../UiElements/Select')),
  },
  {
    path: 'stepper',
    component: lazy(() => import('../UiElements/Stepper')),
  },
  {
    path: 'textFields',
    component: lazy(() => import('../UiElements/TextFields')),
  },
  {
    path: 'dropzone',
    component: lazy(() => import('../AdvancedModules/Dropzone')),
  },
  {
    path: 'material-ui-tables',
    component: lazy(() => import('../Tables/MaterialUiTables')),
  },
  {
    path: 'beachesmap',
    component: lazy(() => import('../Map/Beach')),
  },
  {
    path: 'buoysmap',
    component: lazy(() => import('../Map/Buoy')),
  },
  {
    path: 'google-chart',
    component: lazy(() => import('../Charts/googleChart')),
  },
  {
    path: 'rechart',
    component: lazy(() => import('../Charts/recharts')),
  },
  {
    path: 'react-trend',
    component: lazy(() => import('../Charts/reactTrend')),
  },
  //  {
  //   path:`${url}/todos',
  //   component:lazy(() => import('../Todos/Todo')),
  // },
  // {
  //   path: 'reactVis',
  //   component: lazy(() => import('../Charts/reactVis'))
  // },
  {
    path: 'react-chartkick',
    component: lazy(() => import('../Charts/reactChartKick')),
  },
  {
    path: 'react-chart-2',
    component: lazy(() => import('../Charts/reactChart2')),
  },
  {
    path: 'dialogs',
    component: lazy(() => import('../AdvanceUI/Dialogs')),
  },
  {
    path: 'gridlist',
    component: lazy(() => import('../AdvanceUI/GridList')),
  },
  {
    path: 'popovers',
    component: lazy(() => import('../AdvanceUI/Popovers')),
  },
  {
    path: 'progress',
    component: lazy(() => import('../AdvanceUI/Progress')),
  },
  {
    path: 'snackbar',
    component: lazy(() => import('../AdvanceUI/Snackbar')),
  },
  {
    path: 'tabs',
    component: lazy(() => import('../AdvanceUI/Tabs')),
  },
  {
    path: 'tooltips',
    component: lazy(() => import('../AdvanceUI/Tooltips')),
  },
  {
    path: 'widgets',
    component: lazy(() => import('../Widgets')),
  },
  {
    path: 'material-ui-picker',
    component: lazy(() => import('../AdvancedModules/MaterialUIPicker')),
  },
  {
    path: 'problems/:problemId',
    component: lazy(() => import('../Problems/singleInvoice')),
  },
  {
    path: 'problems',
    component: lazy(() => import('../Problems')),
  },
  {
    path: 'react-color',
    component: lazy(() => import('../AdvancedModules/ReactColor')),
  },
  {
    path: 'expansion-panel',
    component: lazy(() => import('../UiElements/ExpansionPanel')),
  },
  {
    path: 'bottom-navigation',
    component: lazy(() => import('../UiElements/BottomNavigation')),
  },
  {
    path: 'modals',
    component: lazy(() => import('../UiElements/Modals')),
  },
  {
    path: 'box',
    component: lazy(() => import('../Box')),
  },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <Suspense fallback={<Loader />}>
        <div style={style}>
          <Switch>
            {routes.map(singleRoute => {
              const { path, exact, ...otherProps } = singleRoute;
              return (
                  <Route
                    exact//={exact === false ? false : true}
                    key={singleRoute.path}
                    path={`${url}/${singleRoute.path}`}
                    {...otherProps}
                  />
              );
            })}
            <Route component={PageNotFound} />
           </Switch>
        </div>
      </Suspense>
    );
  }
}

export default AppRouter;
