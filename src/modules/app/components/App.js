import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../../../theme'

import injectTapEventPlugin from 'react-tap-event-plugin'

import './App.css'
import Header from './Header'
import Alerts from '../../alert/components/Alerts'

import Loginform from '../../auth/components/Loginform'
import Forgotform from '../../auth/components/Forgotform'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const links = [
  {
    label: 'dashboard',
    path: '/',
  },
  {
    label: 'sites',
    path: '/site',
  },
  {
    label: 'users',
    path:  '/user',
  },
]

export class App extends Component {

  render() {

    const { children, pathname, routeChildren } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Alerts />
          <Header links={links} pathname={pathname} routeChildren={routeChildren} />
          <Loginform />
          <Forgotform />
          {children}
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  children: PropTypes.object,
  pathname: PropTypes.string,
  routeChildren: PropTypes.array,
}

function mapStateToProps(state, ownProps) {
  return {
    pathname: ownProps.location.pathname,
    routeChildren: ownProps.route.childRoutes,
  };
}

export default connect(
  mapStateToProps
)(App)
