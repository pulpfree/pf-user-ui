import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../../../theme'

import injectTapEventPlugin from 'react-tap-event-plugin'

import './App.css'
import Header from './Header'

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
          <Header links={links} pathname={pathname} routeChildren={routeChildren} />
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
