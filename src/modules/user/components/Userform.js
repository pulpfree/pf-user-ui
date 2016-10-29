import React, { Component, PropTypes } from 'react'

import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  persistUser,
  setUserCreate,
  setUserProp,
  setUserScratch,
} from '../userActions'
import {
  userScratchSelector,
  userCurrentSelector,
} from '../userSelectors'

import ActionDone from 'material-ui/svg-icons/action/done'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { yellow500 } from 'material-ui/styles/colors'

import '../../../styles/form.css'

const roles = [
  {id: 'admin', checked: false, label: 'Administrator'},
  {id: 'superuser', checked: false, label: 'Super User'},
]

export class UserForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roles: roles
    }
  }

  componentWillMount = () => {
    const { method, user } = this.props

    if (method === 'edit') {
      this.props.actions.setUserScratch({item: user})
      this.setState({roles: user.roles.asMutable()})
    } else {
      this.props.actions.setUserCreate()
    }
  }

  _onCheck = (e, val, field) => {
    this.props.actions.setUserProp({[field]: val})
  }

  _onCheckRole = (e, val, field) => {
    const rs = roles.map(r => {
      if (r.id === field.id) {
        r.checked = val
      }
      return r
    })
    this.setState({roles: rs})
    this.props.actions.setUserProp({'roles': rs})
  }

  _onPropChange = (field) => {
    const val = this.refs[field].input.value
    this.props.actions.setUserProp({[field]: val})
  }

  _validate = (field) => {
    // console.log('validate:', this.refs.email.state)
    // console.log('validate:', this.refs.email.input.value)
  }

  _onSubmit = () => {
    // console.log('submit form:', )
    this.props.actions.persistUser()
  }

  render () {

    let email = {error: false}

    const { scratch } = this.props

    return (
      <div style={{width: 600, margin: 'auto'}}>
        <Paper style={{padding: 20}}>
        <h2>User Details</h2>
          <form onSubmit={() => this._onSubmit()}>

            <legend className='row'>Login</legend>
            <div className='form-row'>
              <TextField
                  className='form-text-input'
                  errorText={email.error && 'This field is required'}
                  floatingLabelText='Email'
                  onChange={() => this._onPropChange('email')}
                  onBlur={() => this._validate('email')}
                  ref='email'
                  type='email'
                  value={scratch.email || ''}
              />
              <div className='form-row-spacer' />
              <TextField
                  className='form-text-input'
                  floatingLabelText='Password'
                  onChange={() => this._onPropChange('password')}
                  onBlur={() => this._validate('password')}
                  ref='password'
                  type='password'
                  value={scratch.password || ''}
              />
            </div>

            <legend className='row'>Contact</legend>
            <div className='form-row'>
              <TextField
                  className='form-text-input'
                  floatingLabelText='First Name'
                  onChange={() => this._onPropChange('name.first')}
                  onBlur={() => this._validate('name.first')}
                  ref='name.first'
                  value={scratch.name.first || ''}
              />
              <div className='form-row-spacer' />
              <TextField
                  className='form-text-input'
                  floatingLabelText='Last Name'
                  onChange={() => this._onPropChange('name.last')}
                  onBlur={() => this._validate('name.last')}
                  ref='name.last'
                  value={scratch.name.last || ''}
              />
            </div>

            <legend className='row'>Roles & Status</legend>
            <div className='form-row'>
              <div style={{flex: 1}}>
                <Subheader>Status</Subheader>
                <Checkbox
                    className='form-text-input'
                    label="Active"
                    labelPosition="right"
                    onBlur={() => this._validate('active')}
                    onCheck={(e, val) => this._onCheck(e, val, 'active')}
                    ref='active'
                    value={scratch.active}
                />
              </div>
              <div style={{flex: 1.25}}>
                  <Subheader>Roles</Subheader>
                <List>
                  {this.state.roles.map(r => {
                    return (
                      <Checkbox
                          key={r.id}
                          label={<div style={{width: 130}}>{r.label}</div>}
                          labelPosition="right"
                          onCheck={(e, val) => this._onCheckRole(e, val, r)}
                          checked={r.checked}
                          style={{marginBottom: 10}}
                      />
                    )
                  })}
                </List>
              </div>

            </div>

            <div className='form-row'>
              <RaisedButton
                  icon={<ContentClear />}
                  label="Cancel"
                  onClick={() => this._onSubmit()}
                  secondary={true}
                  labelStyle={{color: '#333'}}
              />
              <RaisedButton
                  icon={<ActionDone />}
                  label="Submit User Info"
                  onClick={() => this._onSubmit()}
                  primary={true}
                  labelStyle={{color: yellow500}}

              />
            </div>

          </form>
        </Paper>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user:     userCurrentSelector(state),
    scratch:  userScratchSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      persistUser,
      setUserCreate,
      setUserProp,
      setUserScratch,
    }, dispatch),
  }
}

UserForm.propTypes = {
  actions:  PropTypes.object.isRequired,
  method:   PropTypes.object,
  scratch:  PropTypes.object,
  user:     PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm)
