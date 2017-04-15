import React, { Component } from 'react'

import Paper from 'material-ui/Paper'

export default class Dashboard extends Component {

  render() {

    return (
      <div style={{width: '75%', margin: 'auto', textAlign: 'center', paddingTop: 35}}>
        <Paper style={{padding: 35}}>
          <h1>Dashboard</h1>
        </Paper>
      </div>
    )
  }
}

