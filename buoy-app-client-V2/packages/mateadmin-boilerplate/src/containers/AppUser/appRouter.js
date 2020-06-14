import React, { Component, lazy, Suspense } from 'react';
import Route from '../../components/utility/customRoute';
import Loader from '../../components/utility/Loader/';

const routes = [
  {
    path: 'dashboard',
    component: lazy(() => import('../Dashboard')),
  },
  {
    path: 'blank-page',
    component: lazy(() => import('../BlankPage')),
  },
  {
    path: 'report-problem',
    component: lazy(() => import('../ReportProblem/ReportProblemPage')),
  },
  {
    path: 'redux-forms',
    component: lazy(() => import('../Forms/FormPage')),
  },
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <Suspense fallback={<Loader />}>
        <div style={style}>
          {routes.map(singleRoute => {
            const { path, exact, ...otherProps } = singleRoute;
            return (
              <Route
                exact={exact === false ? false : true}
                key={singleRoute.path}
                path={`${url}/${singleRoute.path}`}
                {...otherProps}
              />
            );
          })}
        </div>
      </Suspense>
    );
  }
}

export default AppRouter;