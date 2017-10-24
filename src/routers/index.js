import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import LoginLayout from '../layout/LoginLayout'
import Login from '../modules/login/components/Login'
import MainLayout from '../layout/main-layout/containers'

import Home from '../modules/home/components'
import PatientIndex from '../modules/patient/components/PatientIndex'
import ChatIndex from '../modules/chat/containers/ChatIndex'

// const Patient = asyncComponent(() => import('./patient').then(module => module.default))

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/chat',
    exact: true,
    component: ChatIndex,
  },
  {
    path: '/chat/:patientId',
    component: ChatIndex,
  },
  {
    path: '/patient/:patientId',
    component: PatientIndex,
  },
  {
    path: '/patient',
    strict: true,
    exact: true,
    component: PatientIndex,
  },
  {
    path: '/alert',
    component: () => <div>alert</div>,
  },
  // {
  //   path: '/patient/:patienId',
  //   component: PatientIndex,
  // },
]

const getRouters = () => (
  <Router>
    <RootContainer>
      <Switch>
        {routes.map(({ path, exact, component: Comp }) => (
          <Route
            key={path}
            path={path}
            exact={exact}
            render={props => (
              <MainLayout {...props}>
                <Comp {...props} />
              </MainLayout>
            )}
          />
        ))}
        <Route
          path="/login"
          render={props => (
            <LoginLayout {...props}>
              <Login {...props} />
            </LoginLayout>
          )}
        />
      </Switch>
    </RootContainer>
  </Router>
)

const RootContainer = styled.div`
  min-width: 1180px;
  min-height: 580px;
`

export default getRouters
