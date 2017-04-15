// import React, { Component, PropTypes } from 'react'
import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import * as alertActions from '../../alert/alertActions'
import '../../../styles/form.css'

export class ForgotForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: 'rond@webbtech.net',
      showConfirm: false
    }
  }

  componentDidMount = () => {
    const { query } = this.props
    if (!query.domainID) {
      this.props.actions.alertSend({
        dismissAfter: 5000,
        message:  'ERROR: Missing domain id in request. Check your link.',
        type:     'danger',
      })
    }
  }

  _onEmailChange = (val) => {
    console.log('val:', val)
    this.setState({email: val})
  }

  _onSubmit = () => {
    const { authResetPasswd, query } = this.props
    const args = {
      email: this.state.email,
      domainID: query.domainID
    }
    authResetPasswd(args).then(res => {
      this.setState({showConfirm: true})
    }).catch(err => {
      console.log('err:', err)
    })
  }

  _renderForm = () => {
    return (
      <div style={{width: 400, margin: 'auto', marginTop: 100, backgroundColor: '#efefef', padding: 20}}>
        <form onSubmit={() => this._onSubmit()}>

          <legend className='row'>Forgot Password</legend>
          <div className='form-col'>
          <div style={{marginTop: 20}}>Enter your email address to have a reset link sent to you.</div>
            <TextField
                floatingLabelText='Email'
                autoFocus={true}
                onChange={(e, val) => this._onEmailChange(val)}
                type='email'
                value={this.state.email}
            />
            <div style={{marginTop: 20}} />
            <RaisedButton
                // icon={<ActionDone />}
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
        An email has been sent to: {this.state.email} with instructions on how to reset your password.
      </div>
    )
  }

  render() {
    return <div>
    {this.state.showConfirm ? this._renderConfirm() : this._renderForm()}
    </div>
  }
}

const RESET_REQUEST_MUTATION = gql`
  mutation authResetPasswd($fields:AuthResetPasswdInput) {
    authResetPasswd(input:$fields) {
      result
      ok
    }
  }`

const withResetForm = graphql(RESET_REQUEST_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      authResetPasswd(fields) {
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

const MutateForgotForm = withApollo(compose(
  withResetForm,
)(ForgotForm))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MutateForgotForm)

