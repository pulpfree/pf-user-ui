import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import * as alertActions from '../../alert/alertActions'
import '../../../styles/form.css'

export class PasswordForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      password: 'NewPassword1',
      repeatPassword: 'NewPassword1',
      showConfirm: false
    }
  }

  _onFieldChange = (val, field) => {
    this.setState({[field]: val})
  }

  _onSubmit = () => {
    const { authResetToken, query } = this.props
    console.log('query:', query)
    const args = {
      resetToken: query.token,
      domainID:   query.domainID,
      password:   this.state.password
    }
    authResetToken(args).then(res => {
      this.setState({showConfirm: true})
    }).catch(err => {
      console.log('err:', err)
    })
  }

  _renderForm = () => {
    return (
      <div style={{width: 400, margin: 'auto', marginTop: 100, backgroundColor: '#efefef', padding: 20}}>
        <form onSubmit={() => this._onSubmit()}>

          <legend className='row'>Reset Password</legend>
          <div className='form-col'>
            <TextField
                floatingLabelText='Enter New Password'
                autoFocus={true}
                onChange={(e, val, field) => this._onFieldChange(val, 'password')}
                type='password'
                value={this.state.password}
            />
            <TextField
                floatingLabelText='Repeat Password'
                onChange={(e, val, field) => this._onFieldChange(val, 'repeatPassword')}
                type='password'
                value={this.state.repeatPassword}
            />
            <div style={{marginTop: 30}} />
            <RaisedButton
                label='Submit'
                onClick={() => this._onSubmit()}
                secondary={true}
            />
          </div>

        </form>
      </div>
    )
  }

  _renderConfirm = () => {
    return (
      <div style={{width: 400, margin: 'auto', marginTop: 100, backgroundColor: '#efefef', padding: 20, textAlign: 'justify', lineHeight: 1.5}}>
        Your password has been successfully reset.
      </div>
    )
  }

  render() {
    return <div>
    {this.state.showConfirm ? this._renderConfirm() : this._renderForm()}
    </div>
  }
}

const RESET_PASSWD_MUTATION = gql`
  mutation authResetToken($fields:AuthResetTokenInput) {
    authResetToken(input:$fields) {
      id
      contact {
        first
        last
      }
      token
      scope {
        id
        label
      }
      scopeBits
    }
  }`

const withPasswdForm = graphql(RESET_PASSWD_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      authResetToken(fields) {
        return mutate({
          variables: { fields }
        })
      }
    }
  }
})

function mapStateToProps(state, ownProps) {
  return {
    query: ownProps.location.query,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions
    }, dispatch),
  }
}

const MutatePasswordForm = withApollo(compose(
  withPasswdForm,
)(PasswordForm))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MutatePasswordForm)

