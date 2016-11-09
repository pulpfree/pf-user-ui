import React, { Component, PropTypes } from 'react'

const stylesAlert = {
  base: {
    position: 'relative',
    overflow: 'hidden',
    lineHeight: '18px',
    minHeight: 50,
    borderRadius: 3,
    marginBottom: 2,
    maxHeight: 400,
    boxSizing: 'border-box',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, .25)',
    padding: '1em',
    color: '#fff'
  },

  success: {
    color: '#44662C',
    backgroundColor: '#D7EECE'
  },

  info: {
    color: '#245C7E',
    backgroundColor: '#CAE3F3'
  },

  warning: {
    color: '#5E4922',
    backgroundColor: '#FBF096'
  },

  danger: {
    color: '#6F2526',
    backgroundColor: '#EFD6D6'
  }
}

class Alert extends Component {

  componentWillMount = () => {
    this._id = new Date().getTime()
    this._onActionClick = this._onActionClick.bind(this)
  }

  _onActionClick = (event) => {
    if (this.props.onClick) {
      this.props.onActionClick()
    } else {
      return
    }
  }

  render() {
    const { message, type } = this.props
    const stylePerType = stylesAlert[type]
    let styles = {
      ...stylesAlert.base,
      ...stylePerType
    }

    return <div style={styles} dangerouslySetInnerHTML={{ __html: message }} />
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']).isRequired
}

export default Alert
