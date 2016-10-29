import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

import logo from '../../../assets/images/logo.svg'


class Header extends Component {

  render() {

    const { links, pathname } = this.props

    let ls = links.map(l => {
      let eleStyle = {borderRadius: 0}
      if (pathname === l.path) {
        eleStyle.backgroundColor = '#fff'
        eleStyle.color = '#000'
      }

      return (
        <FlatButton
            style={eleStyle}
            containerElement={<Link to={l.path} />}
            key={l.path}
            label={l.label}
            secondary={true}
        />
      )
    })

    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav className='App-nav'>{ls}</nav>
      </header>
    )
  }
}

Header.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Header
