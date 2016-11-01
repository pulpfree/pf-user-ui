import React, { Component, PropTypes } from 'react'

import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
// import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag'

import {
  persistSite,
  setSiteCreate,
  setSiteProp,
  setSiteScratch,
} from '../siteActions'
import {
  siteScratchSelector,
  siteCurrentSelector,
} from '../siteSelectors'

import ActionDone from 'material-ui/svg-icons/action/done'
import ContentClear from 'material-ui/svg-icons/content/clear'
import { yellow500 } from 'material-ui/styles/colors'

import '../../../styles/form.css'

export class Siteform extends Component {

  componentWillMount = () => {
    const { scratch } = this.props
    if (!scratch._id) {
      this.props.actions.setSiteCreate()
    }
  }

  _onPropChange = (field) => {
    const val = this.refs[field].input.value
    this.props.actions.setSiteProp({[field]: val})
  }

  _onPropChange = (field) => {
    const val = this.refs[field].input.value
    this.props.actions.setSiteProp({[field]: val})
  }

  _onCheck = (e, val, field) => {
    this.props.actions.setSiteProp({[field]: val})
  }

  _validate = (field) => {
    // console.log('validate:', this.refs.email.state)
    // console.log('validate:', this.refs.email.input.value)
  }

  _onSubmit = () => {
    // console.log('submit form:', )
    this.props.actions.persistSite()
  }

  // const UPDATE_SITE_MUTATION = gql''

  render () {

    /*const CREATE_SITE_MUTATION = gql`
    mutation addSite {
      createSite(credentialKeyPassword: "password", credentialKeyUsername: "email", collectionNm: "users", dbNm: "test-db", domain: "ca.example.foo12", name: "My New Site", resetURI: "http://foo.com/auth") {
        _id
        domain
        name
      }
    }
  `*/

    const { scratch } = this.props
    // console.log('scratch:', scratch)

    return (
      <div style={{width: 'auto', margin: 'auto'}}>
        <h2>Site Details</h2>
        <form onSubmit={() => this._onSubmit()}>

          <div className='form-row'>

            <div className='form-col'>
              <legend className='row'>Domain</legend>
              <TextField
                floatingLabelText='Identifier Name'
                onChange={() => this._onPropChange('name')}
                onBlur={() => this._validate('name')}
                ref='name'
                value={scratch.name || ''}
            />
            <TextField
                floatingLabelText='FQDN [Domain]'
                onChange={() => this._onPropChange('domain')}
                onBlur={() => this._validate('domain')}
                ref='domain'
                value={scratch.domain || ''}
            />

            <br /><br />
            <legend className='row'>Security</legend>
              <TextField
                  floatingLabelText='Public PEM File'
                  onChange={() => this._onPropChange('pemFilePublic')}
                  onBlur={() => this._validate('pemFilePublic')}
                  ref='pemFilePublic'
                  value={scratch.pemFilePublic || ''}
              />
              <TextField
                  floatingLabelText='Private PEM File'
                  onChange={() => this._onPropChange('pemFilePrivate')}
                  onBlur={() => this._validate('pemFilePrivate')}
                  ref='pemFilePrivate'
                  value={scratch.pemFilePrivate || ''}
              />
              <TextField
                  disabled={true}
                  floatingLabelText='Signing Method'
                  onChange={() => this._onPropChange('signingMethod')}
                  onBlur={() => this._validate('signingMethod')}
                  ref='signingMethod'
                  value={scratch.signingMethod || ''}
              />
            </div>

            <div className='form-row-spacer' />
            <div className='form-row-spacer' />

            <div className='form-col'>
              <legend className='row'>Database</legend>
              <TextField
                  floatingLabelText='Name'
                  onChange={() => this._onPropChange('dbNm')}
                  onBlur={() => this._validate('dbNm')}
                  ref='dbNm'
                  value={scratch.dbNm || ''}
              />
              <TextField
                  floatingLabelText='Collection'
                  onChange={() => this._onPropChange('collectionNm')}
                  onBlur={() => this._validate('collectionNm')}
                  ref='collectionNm'
                  value={scratch.collectionNm || ''}
              />

              <br /><br />
            <legend className='row'>Site Info</legend>
              <TextField
                  floatingLabelText='Credential Password Field'
                  onChange={() => this._onPropChange('credentialKeyPassword')}
                  onBlur={() => this._validate('credentialKeyPassword')}
                  ref='credentialKeyPassword'
                  value={scratch.credentialKeyPassword || ''}
              />
              <TextField
                  floatingLabelText='Credential Sitename Field'
                  onChange={() => this._onPropChange('credentialKeyUsername')}
                  onBlur={() => this._validate('credentialKeyUsername')}
                  ref='credentialKeyUsername'
                  value={scratch.credentialKeyUsername || ''}
              />
              <TextField
                  floatingLabelText='Reset URI'
                  onChange={() => this._onPropChange('resetURI')}
                  onBlur={() => this._validate('resetURI')}
                  ref='resetURI'
                  value={scratch.resetURI || ''}
              />

            </div>
          </div>

          <div className='form-row'>
            <div style={{flex: 1}}>
              <Subheader>Status</Subheader>
              <Checkbox
                  label="Active"
                  labelPosition="right"
                  // onBlur={() => this._validate('active')}
                  onCheck={(e, val) => this._onCheck(e, val, 'active')}
                  ref='active'
                  value={scratch.active}
              />
            </div>
          </div>

          <div className='form-row' style={{justifyContent: 'space-around'}}>
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
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    site:     siteCurrentSelector(state),
    scratch:  siteScratchSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      persistSite,
      setSiteCreate,
      setSiteProp,
      setSiteScratch,
    }, dispatch),
  }
}

Siteform.propTypes = {
  actions:  PropTypes.object.isRequired,
  method:   PropTypes.object,
  scratch:  PropTypes.object,
  site:     PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Siteform)
