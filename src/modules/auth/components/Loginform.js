// import React, { Component, PropTypes } from 'react'
import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

import gql from 'graphql-tag'
import { bindActionCreators } from 'redux'
import { compose, graphql, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import '../../../styles/form.css'
import * as alertActions from '../../alert/alertActions'
import { config } from '../../../config/config'
import { loginUser } from '../../auth/authActions'
import { userAuthVals } from '../../../utils'

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    const user = userAuthVals.getUser()
    let email = user && user.email ? user.email : ''
    this.state = {
      email,
      password: ''
    }
  }

  _onChange = (field) => {
    const val = this.refs[field].input.value
    this.setState({[field]: val})
  }

  _onSubmit = () => {
    const { authUser, location } = this.props
    const domainID = config.DOMAIN_ID
    const creds = {
      email: this.state.email,
      password: this.state.password,
      domainID
    }
    // console.log('creds:', creds)
    authUser(creds).then(res => {
      userAuthVals.setVals(res.data.authUser)
      this.props.actions.loginUser(res.data.authUser)
      this.props.client.resetStore()
      if (location.state && location.state.nextPathname) {
        this.props.router.replace(location.state.nextPathname)
      } else {
        this.props.router.replace('/admin')
      }
    }).catch(err => {
      this.props.actions.alertSend({
        message:  `ERROR: ${err.message}`,
        type:     'danger',
        domainID
      })
    })
  }

  render() {

    return (
      <div style={{width: 400, margin: 'auto'}}>
      <Paper style={{padding: 35}}>
        <form onSubmit={() => this._onSubmit()}>

          <legend className='row'>Enter Login Credentials</legend>
          <div className='form-col'>
            <TextField
                floatingLabelText='Email'
                type='email'
                onChange={() => this._onChange('email')}
                // onBlur={() => this._validate('email')}
                ref='email'
                value={this.state.email}
            />
            <TextField
                floatingLabelText='Password'
                type='password'
                onChange={() => this._onChange('password')}
                // onBlur={() => this._validate('password')}
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
        </Paper>
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
      ...alertActions,
      loginUser
    }, dispatch),
  }
}

const MutateLoginForm = withApollo(compose(
  withLoginForm,
)(LoginForm))

export default connect(
  null,
  mapDispatchToProps
)(MutateLoginForm)
