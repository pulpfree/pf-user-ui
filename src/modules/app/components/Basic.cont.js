import React, { Component, PropTypes } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { muiTheme } from '../../../theme'

import Alerts from '../../alert/components/Alerts'
import logo from '../../../assets/images/logo.svg'
import './App.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin()

export default class Basic extends Component {

  render() {
    const { children } = this.props

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <main>
          <Alerts />
          <header className='reset-header'>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          {children}
        </main>
      </MuiThemeProvider>
    )
  }
}

Basic.propTypes = {
  children: PropTypes.object.isRequired
}
