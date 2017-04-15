import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../../../theme'

import { withApollo } from 'react-apollo'
import { browserHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'

import './App.css'
import Header from './Header'
import Alerts from '../../alert/components/Alerts'

import { authSelector } from '../../auth/authSelectors'
import { logoutUser, setUser } from '../../auth/authActions'

import { userAuthVals } from '../../../utils'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

const links = [
  {
    label: 'dashboard',
    path: '/admin',
  },
  {
    label: 'sites',
    path: '/admin/site',
  },
  {
    label: 'users',
    path:  '/admin/user',
  },
]

export class App extends Component {

  constructor(props) {
    super(props)
    const { auth } = this.props
    const user = userAuthVals.getUser()
    if (user && !auth.isAuthenticated) {
      this.props.actions.setUser(user)
    }
  }

  logoutUserFunc = () => {
    this.props.actions.logoutUser()
    browserHistory.push('/login')
    // todo: can we get away without this, as when apollo
    // is reseting we get errors due to not being authenticated
    window.location.reload(true)
    // this.props.client.resetStore()
  }

  render() {

    const { auth, children, pathname, routeChildren } = this.props
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <Alerts />
          <Header
              auth={auth}
              links={links}
              logoutUser={this.logoutUserFunc}
              pathname={pathname}
              routeChildren={routeChildren}
          />
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      logoutUser,
      setUser
    }, dispatch),
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth: authSelector(state),
    pathname: ownProps.location.pathname,
    routeChildren: ownProps.route.childRoutes,
  };
}

export default withApollo(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
