import React, { Component, PropTypes } from 'react'

import DropDownMenu from 'material-ui/DropDownMenu'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'

import { Link } from 'react-router'

import logo from '../../../assets/images/logo.svg'


class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {value: 1}
  }

  _onUserMenuChange = (val) => {
    if (val === 2) {
      this.props.logoutUser()
    }
  }

  render() {

    const { auth, links } = this.props
    const eleStyle = {borderRadius: 0}
    const activeStyle = {
      backgroundColor: '#fff',
      color: '#000'
    }
    const isAuth = auth.isAuthenticated

    let activeOnIndex
    let ls = links.map(l => {
      activeOnIndex = l.path === '/admin' ? true : false
      return (
        <FlatButton
            containerElement={<Link onlyActiveOnIndex={activeOnIndex} activeStyle={activeStyle} to={l.path} />}
            key={l.path}
            label={l.label}
            secondary={true}
            style={eleStyle}
        />
      )
    })

    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <nav className='App-nav'>{ls}</nav>
        <div style={{ right: 10, top: 5, position: 'absolute'}}>
          {isAuth &&
          <DropDownMenu
              onChange={(e, i, val) => this._onUserMenuChange(val)}
              labelStyle={{color: '#22A699'}}
              value={this.state.value}
          >
            <MenuItem value={1} primaryText={auth.fullName}/>
            <MenuItem value={2} primaryText='Logout' />
          </DropDownMenu>
          }
          {!isAuth &&
            <FlatButton
                containerElement={<Link to='/admin/login' />}
                label='Login'
                secondary={true}
                value={3}
            />
          }
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  links: PropTypes.array.isRequired,
}

export default Header
