import React, { Component, PropTypes } from 'react'

import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router'

import logo from '../../../assets/images/logo.svg'


class Header extends Component {

  render() {

    const { links } = this.props
    const eleStyle = {borderRadius: 0}
    const activeStyle = {
      backgroundColor: '#fff',
      color: '#000'
    }

    let activeOnIndex
    let ls = links.map(l => {
      activeOnIndex = l.path === '/' ? true : false

      return (
        <FlatButton
            style={eleStyle}
            containerElement={<Link onlyActiveOnIndex={activeOnIndex} activeStyle={activeStyle} to={l.path} />}
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
