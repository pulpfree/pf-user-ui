import React, { Component, PropTypes } from 'react'

import ActionDone from 'material-ui/svg-icons/action/done'
import Checkbox from 'material-ui/Checkbox'
import ContentClear from 'material-ui/svg-icons/content/clear'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'
import { List } from 'material-ui/List'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
// import update from 'react-addons-update'

import { setUserProp } from '../userActions'
import * as alertActions from '../../alert/alertActions'
import {
  userListSelector,
  userScratchSelector
} from '../userSelectors'
import { sortBy } from '../../../utils'

const R = require('ramda')

import '../../../styles/form.css'


export class UserForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      roles: []
    }
  }

  componentDidMount = () => {
    const userRoles = this.props.scratch.scope
    let roles = this.props.fetchSiteById.roles.map(r => {
      let ur = userRoles.find(u => u.id === r.id )
      if (ur) {
        r.checked = true
      }
      return r
    })
    this.setState({roles})
  }

  _onCheck = (e, val, field) => {
    this.props.actions.setUserProp({[field]: val})
  }

  _onCancelForm = () => {
    this.props.closeFormFunc()
  }

  _onCheckRole = (e, val, field) => {
    const rs = this.state.roles.map(r => {
      if (r.id === field.id) {
        r.checked = val
      }
      return r
    })
    this.setState({roles: rs})
    const userRoles = rs.filter(r => r.checked)
    const ur = userRoles.map(r => ({id: r.id, label: r.label}))
    this.props.actions.setUserProp({'scope': ur})
  }

  _onPropChange = (field) => {
    const val = this.refs[field].input.value
    this.props.actions.setUserProp({[field]: val})
  }

  _validate = (field) => {
  }

  _onSubmit = () => {
    const { createUser, scratch, updateUser } = this.props
    const edit = scratch._id ? true : false
    const successMsg = edit ? 'User info successfully updated' : 'User successfully created'

    let p
    if (edit) {
      p = updateUser(scratch)
    } else {
      p = createUser(scratch)
    }
    p.then(res => {
      this.props.closeFormFunc()
      this.props.actions.alertSend({
        dismissAfter: 2000,
        message:      successMsg,
        type:         'success',
      })
    }).catch(err => {
      this.props.actions.alertSend({
        dismissAfter: 5000,
        message:      `ERROR: ${err.message}`,
        type:         'danger',
      })
    })
  }

  render () {

    let email = {error: false}
    const { loading, scratch } = this.props

    if (loading) {
      return (
        <div>Loading...</div>
      );
    }
    if (this.props.error) {
      return (
        <div>Fatal error occurred: {this.props.error.message}</div>
      )
    }

    return (
      <div style={{margin: 'auto'}}>
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
                  onChange={() => this._onPropChange('contact.name.first')}
                  onBlur={() => this._validate('contact.name.first')}
                  ref='contact.name.first'
                  value={scratch.contact.name.first || ''}
              />
              <div className='form-row-spacer' />
              <TextField
                  className='form-text-input'
                  floatingLabelText='Last Name'
                  onChange={() => this._onPropChange('contact.name.last')}
                  onBlur={() => this._validate('contact.name.last')}
                  ref='contact.name.last'
                  value={scratch.contact.name.last || ''}
              />
            </div>

            <legend className='row'>Roles & Status</legend>
            <div className='form-row'>
              <div style={{flex: 1}}>
                <Subheader>Status</Subheader>
                <Checkbox
                    className='form-text-input'
                    label='Active'
                    labelPosition='right'
                    onBlur={() => this._validate('active')}
                    onCheck={(e, val) => this._onCheck(e, val, 'active')}
                    ref='active'
                    checked={scratch.active}
                />
              </div>
              <div style={{flex: 1.25}}>
                  <Subheader>Roles</Subheader>
                <List>
                  {this.state.roles.length && this.state.roles.map(r => {
                    return (
                      <Checkbox
                          key={r.id}
                          label={<div style={{width: 130}}>{r.label}</div>}
                          labelPosition='right'
                          onCheck={(e, val) => this._onCheckRole(e, val, r)}
                          defaultChecked={r.checked}
                          value={r.id}
                          style={{marginBottom: 10}}
                      />
                    )
                  })}
                </List>
              </div>
            </div>

            <div className='form-row' style={{justifyContent: 'space-around'}}>
              <RaisedButton
                  icon={<ContentClear />}
                  label="Cancel"
                  onClick={() => this._onCancelForm()}
              />
              <RaisedButton
                  icon={<ActionDone />}
                  label="Submit User Info"
                  onClick={() => this._onSubmit()}
                  secondary={true}
              />
            </div>
          </form>
      </div>
    )
  }
}

const SITE_QUERY = gql`
  query fetchSiteById ($siteID:ID) {
    fetchSiteById (_id:$siteID) {
      _id
      roles {
        id
        label
      }
    }
  }`

const withSite = graphql(SITE_QUERY, {
  options: ({ userList }) => ({ variables: { siteID: userList.domainID } }),
  props({data: {error, loading, fetchSiteById, refetch}}) {
    return {error, loading, fetchSiteById, refetch}
  }
})


const CREATE_USER_MUTATION = gql`
  mutation createUser($fields:UserInput!) {
    createUser(input:$fields) {
      _id
      active
      contact {
        _id
        email
        name {
          first
          last
        }
      }
      email
      scope {
        id
        label
      }
    }
  }`

const UPDATE_USER_MUTATION = gql`
  mutation updateUser($fields:UserInput!) {
    updateUser(input:$fields) {
      _id
      active
      contact {
        _id
        email
        name {
          first
          last
        }
      }
      email
      scope {
        id
        label
      }
    }
  }`

const withAddForm = graphql(CREATE_USER_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      createUser(fields) {
        return mutate({
          variables: { fields },
          updateQueries: {
            fetchUsers: (prev, { mutationResult }) => {
              let newUsr = R.merge(mutationResult.data.createUser, fields)
              let newList = R.clone(prev)
              newList.fetchUsers.push(newUsr)
              sortBy('contact.name.last', newList.fetchUsers)
              return newList
            }
          }
        })
      }
    }
  }
})

const withEditForm = graphql(UPDATE_USER_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      updateUser(fields) {
        return mutate({
          variables: { fields },
          optimisticResponse: {
            __typename: 'Mutation',
            updateUser: {
              _id: fields._id,
              __typename: 'User',
              ...fields
            }
          },
          updateQueries: {
            fetchUsers: (prev, { mutationResult }) => {
              const idx = R.findIndex(R.propEq('_id', fields._id))(prev.fetchUsers)
              let newList = R.clone(prev)
              newList.fetchUsers[idx] = fields
              sortBy('contact.name.last', newList.fetchUsers)
              return newList
            }
          }
        })
      }
    }
  }
})

function mapStateToProps(state) {
  return {
    scratch:  userScratchSelector(state),
    userList: userListSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions,
      setUserProp,
    }, dispatch),
  }
}

UserForm.propTypes = {
  actions:  PropTypes.object.isRequired,
  method:   PropTypes.object,
  scratch:  PropTypes.object,
}

const MutateUserForm = withApollo(compose(
  withAddForm,
  withEditForm,
  withSite
)(UserForm))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MutateUserForm)
