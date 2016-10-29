import React, { Component } from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Link } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import FlatButton from 'material-ui/FlatButton'
// import RaisedButton from 'material-ui/RaisedButton'

import logo from '../../../assets/images/logo.svg'
import './App.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

class App extends Component {

  render() {

    const { children } = this.props

    return (
      {/*<MuiThemeProvider>*/}
      <div className="App">
        {/*<div className="App-header">*/}
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        {/*<FlatButton label="dashboard" secondary={true} containerElement={<Link to='/' />} />
        <FlatButton label="Sites" secondary={true} containerElement={<Link to='/site' />} />
        <FlatButton label="Users" secondary={true} containerElement={<Link to='/user' />} /><br />
        </div>
        <Link to='/'>Home</Link>&nbsp; &mdash; &nbsp;
        <Link to='/site'>Sites</Link>&nbsp; &mdash; &nbsp;
        <Link to='/user'>Users</Link>*/}
        <br />
          {children}
      </div>
      /*</MuiThemeProvider>*/
    )
  }
}

export default App
/*function mapStateToProps(state, ownProps) {
  console.log('ownProps:', ownProps)
  console.log('ownProp.route:', ownProps.route)
  console.log('ownProps.location:', ownProps.location)
  return {
    // id: ownProps.params.id,
    // filter: ownProps.location.query.filter
  };
}

export default connect(
  mapStateToProps
)(App)*/