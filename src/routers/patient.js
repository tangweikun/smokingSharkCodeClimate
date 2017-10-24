import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
// import PatientLayout from '../layout/patient-layout/containers'
// import asyncComponent from '../common/asyncComponent'

// const getComponent = dirPath =>
// asyncComponent(() => import(`../modules/${dirPath}`).then(module => module.default))

const routes = [
  // {
  //   path: '/blood-pressure',
  //   component: BloodPressure,
  // },
  // {
  //   path: '/medical-history',
  //   component: MedicalHistory,
  // },
  // {
  //   path: '/case-record',
  //   component: CaseRecord,
  // },
  // {
  //   path: '/follow-up-soap',
  //   component: FollowUpSoap,
  // },
  {
    path: '/test',
    component: <div />,
  },
]

// https://github.com/ReactTraining/react-router/pull/5430
// When swith the patient details, the profile will refetch always
// It's the react-router v4 bug, it will release later.
// #4578
const PatientRouter = ({ match }) => (
  <Switch>
    {routes.map(({ path, exact, strict, component: Comp }) => (
      <Route
        key={path}
        path={`${match.url}${path}`}
        exact={exact}
        strict={strict}
        render={props => (
          <div {...props}>
            <Comp {...props} />
          </div>
        )}
      />
    ))}
  </Switch>
)

PatientRouter.propTypes = {
  match: PropTypes.object.isRequired,
}
export default PatientRouter
