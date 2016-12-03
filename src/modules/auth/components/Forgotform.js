// import React, { Component, PropTypes } from 'react'
import React, { Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
// import { Link } from 'react-router'
import '../../../styles/form.css'

export class Forgotform extends Component {

  _onSubmit = () => {

  }

  render() {

    return (
      <div style={{width: 350, margin: 'auto', marginTop: 200, backgroundColor: '#efefef', padding: 20}}>
        <form onSubmit={() => this._onSubmit()}>

          <legend className='row'>Forgot Password</legend>
          <div className='form-col'>
          <div style={{marginTop: 20}}>Enter your email address and we'll send you a reset password link.</div>
            <TextField
                floatingLabelText='Email'
                autoFocus={true}
                // onChange={() => this._onPropChange('name')}
                // onBlur={() => this._validate('name')}
                // ref='name'
                // value={scratch.name || ''}
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
}

export default Forgotform