import React, { Component, PropTypes } from 'react'

import ActionDone from 'material-ui/svg-icons/action/done'
import Checkbox from 'material-ui/Checkbox'
import ContentClear from 'material-ui/svg-icons/content/clear'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { compose, graphql, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import update from 'react-addons-update'

import { setSiteProp } from '../siteActions'
import * as alertActions from '../../alert/alertActions'
import {
  siteScratchSelector,
  siteCurrentSelector,
} from '../siteSelectors'

import '../../../styles/form.css'


export class Siteform extends Component {

  _onPropChange = (field) => {
    const val = this.refs[field].input.value
    this.props.actions.setSiteProp({[field]: val})
  }

  _onCheck = (e, val, field) => {
    console.log('check val:', val)
    this.props.actions.setSiteProp({[field]: val})
  }

  _validate = (field) => {
  }

  _onCancelForm = () => {
    this.props.closeFormFunc()
  }

  _onSubmit = () => {
    const { createSite, scratch, updateSite } = this.props
    const edit = scratch._id ? true : false
    const successMsg = edit ? 'Site info successfully updated' : 'Site successfully created'

    let p
    if (edit) {
      p = updateSite(scratch._id, scratch)
    } else {
      p = createSite(scratch)
    }
    p.then(res => {
      this._onCancelForm()
      this.props.actions.alertSend({
        dismissAfter: 2000,
        message:      successMsg,
        type:         'success',
      })
    }).catch(err => {
      this._onCancelForm()
      this.props.actions.alertSend({
        message:  `ERROR: ${err.message}`,
        type:     'danger',
      })
    })
  }

  render () {

    const { scratch } = this.props

    return (
      <div style={{width: 'auto', margin: 'auto'}}>
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
                  floatingLabelText='DB Name'
                  onChange={() => this._onPropChange('dbNm')}
                  onBlur={() => this._validate('dbNm')}
                  ref='dbNm'
                  value={scratch.dbNm || ''}
              />
              <TextField
                  floatingLabelText='User Collection'
                  onChange={() => this._onPropChange('collectionNm')}
                  onBlur={() => this._validate('collectionNm')}
                  ref='collectionNm'
                  value={scratch.collectionNm || ''}
              />
              <TextField
                  floatingLabelText='Contact Collection'
                  onChange={() => this._onPropChange('collectionContactNm')}
                  onBlur={() => this._validate('collectionContactNm')}
                  ref='collectionContactNm'
                  value={scratch.collectionContactNm || ''}
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
                  onCheck={(e, val) => this._onCheck(e, val, 'active')}
                  ref='active'
                  checked={scratch.active}
              />
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
                label="Submit Site Info"
                onClick={() => this._onSubmit()}
                secondary={true}
            />
          </div>
        </form>
      </div>
    )
  }
}

const CREATE_SITE_MUTATION = gql`
  mutation createSite($fields:SiteInput!) {
    createSite(input:$fields) {
      _id
      active
      credentialKeyPassword
      credentialKeyUsername
      collectionNm
      dbNm
      domain
      name
      pemFilePrivate
      pemFilePublic
      resetURI
      signingMethod
    }
  }`

const UPDATE_SITE_MUTATION = gql`
  mutation updateSite($_id:ID!, $fields:SiteInput!) {
    updateSite(_id:$_id, input:$fields) {
      _id
      active
      domain
      name
    }
  }`

const withAddForm = graphql(CREATE_SITE_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      createSite(fields) {
        return mutate({
          variables: { fields },
          updateQueries: {
            fetchSites: (prev, { mutationResult }) => {
              const newSite = mutationResult.data.createSite
              return update(prev, {
                fetchSites: {
                  $unshift: [newSite]
                }
              })
            }
          }
        })
      }
    }
  }
})

const withEditForm = graphql(UPDATE_SITE_MUTATION, {
  props({ ownProps, mutate }) {
    return {
      updateSite(_id, fields) {
        return mutate({
          variables: { _id, fields }
        })
      }
    }
  }
})


function mapStateToProps(state) {
  return {
    site:     siteCurrentSelector(state),
    scratch:  siteScratchSelector(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...alertActions,
      setSiteProp,
    }, dispatch),
  }
}

Siteform.propTypes = {
  actions:  PropTypes.object.isRequired,
  method:   PropTypes.object,
  scratch:  PropTypes.object,
  site:     PropTypes.object,
}

const MutateForm = withApollo(compose(
  withAddForm,
  withEditForm
)(Siteform))

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MutateForm)
