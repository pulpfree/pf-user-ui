// import React, { Component, PropTypes } from 'react'
import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import * as alertActions from '../../alert/alertActions'

import '../../../styles/form.css'

export class Loginform extends Component {
  constructor(props) {
    super(props)
    /*this.state = {
      email: null,
      password: null
    }*/
    this.state = {
      email: 'rond@webbtech.net',
      password: 'NewPassword1'
    }
  }

  _onChange = (field) => {
    const val = this.refs[field].input.value
    this.setState({[field]: val})
  }

  _onSubmit = () => {
    console.log('props:', this.props)
    const { authUser } = this.props
    const creds = {
      email: this.state.email,
      password: this.state.password,
      domainID: ''
    }
  //   email: String!
  // password: String!
  // domainID: String!
    authUser(creds).then(res => {
      console.log('res:', res)
    }).catch(err => {
      console.log('err:', err)
      console.log('err2:', JSON.stringify(err))
      this.props.actions.alertSend({
        message:  `ERROR: ${err.message}`,
        type:     'danger',
        domain: 'local.gales.sales'
      })
    })
  }

  render() {

    return (
      <div style={{width: 350, margin: 'auto', marginTop: 200, backgroundColor: '#efefef', padding: 20}}>
        <form onSubmit={() => this._onSubmit()}>

          <legend className='row'>Enter Login Credentials</legend>
          <div className='form-col'>
            <TextField
                floatingLabelText='Email'
                type='email'
                onChange={() => this._onChange('email')}
                // onBlur={() => this._validate('name')}
                ref='email'
                value={this.state.email}
            />
            <TextField
                floatingLabelText='Password'
                type='password'
                onChange={() => this._onChange('password')}
                // onBlur={() => this._validate('name')}
                ref='password'
                value={this.state.password}
            />
            <div style={{marginTop: 20}} />
            <RaisedButton
                // icon={<ActionDone />}
                label='Login'
                onClick={() => this._onSubmit()}
                secondary={true}
            />
            <div style={{marginTop: 20, textAlign: 'right'}}>
              <Link>Forgot Password</Link>
            </div>
          </div>

        </form>
      </div>
    )
  }
}

const LOGIN_MUTATION = gql`
  mutation authUser($fields:AuthInput) {
    authUser(input:$fields) {
      id
      email
      contact {
        first
        last
      }
      token
    }
  }`

const withLoginForm = graphql(LOGIN_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      authUser(fields) {
        return mutate({
          variables: { fields }
        })
      }
    }
  }
})

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions
    }, dispatch),
  }
}

const MutateLoginForm = withApollo(compose(
  withLoginForm,
)(Loginform))

export default connect(
  null,
  mapDispatchToProps
)(MutateLoginForm)
