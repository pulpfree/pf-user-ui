import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const getter = (obj, propName) => {return obj.get ? obj.get(propName) : obj[propName]}

import Alert from './Alert'

class Alerts extends Component {

  render() {
    const { alerts } = this.props

    const styles = {
      left:         0,
      marginLeft:   10,
      marginRight:  10,
      position:     'fixed',
      right:        0,
      top:          '100px',
      width:        'auto',
      zIndex:       1200,
    }

    const items = alerts.map(alert => {
      return (
        <Alert
            key={getter(alert, 'id')}
            message={getter(alert, 'message')}
            type={getter(alert, 'type')}
        />
      )
    })

    return (
      <div style={styles}>
        <ReactCSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionName="alert"
        >
          {items}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

Alerts.propTypes = {
  alerts: PropTypes.array
}

export default connect(
  (state) => {
    return { alerts: state.get ? state.get('alerts') : state.alerts }
  },
)(Alerts)
